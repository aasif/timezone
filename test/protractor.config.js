exports.config = {
          capabilities: {
                  'browserName': 'chrome' 
          },
          specs: [
                'e2e/login.spec.js',
                'e2e/timezone.spec.js'
          ],
          jasmineNodeOpts: {
                showColors: true,
                defaultTimeoutInterval: 30000,
                isVerbose: true,
          },
        allScriptsTimeout: 20000,
          onPrepare: function(){
                browser.driver.get('http://localhost:8100/');
        }
};