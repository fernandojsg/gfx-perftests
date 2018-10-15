const detectBrowsers = require('detect-browsers');
const opn = require('opn');
var killProcess = require('kill-process');
const findProcess = require('find-process');
const { spawn } = require('child_process');

module.exports = {
  getBrowsers: function() {
    return new Promise((resolve, reject) => {
      detectBrowsers.getInstalledBrowsers()
      .then(browsers => {
        resolve(browsers.map(browser => {browser.name = browser.name.toLowerCase(); return browser}));
      })
      .catch( error => reject(error));
    });
  },
  killBrowser: function(browser) {
    return new Promise(resolve => {    
      resolve();
      return;
      findProcess('cmd', browser.executablePath).then(list => {
        console.log('* killing', browser);
        list.forEach(p => killProcess(p.pid));
        resolve();
      });
    });  
  },
  launchBrowser: function(browser, url) {
    return new Promise(resolve => {
      //var cp = spawn(browser.executablePath, ['http://fernandojsg.com']);
      var cp = opn(url, {app: browser.executablePath}).then(() => {
        resolve();
      });
    });
  }
};