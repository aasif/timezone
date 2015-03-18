
// Describe a feature
describe('Unsuccessful Login', function(){
    it('should not login when wrong password given', function(){        
        element(by.model('user.email')).sendKeys('test@toptal.com');
        element(by.model('user.password')).sendKeys('hello12');
        element(by.id('loginButton')).click().then(function(){
            browser.waitForAngular();
            element(by.css('.error-button')).click();
            expect(browser.getCurrentUrl()).toContain('session/login');
        });
    });
});

// Describe a feature
describe('Login Testing', function(){
    it('should login when correct password given', function(){
        //element(by.model('user.email')).sendKeys('test@toptal.com');
        element(by.model('user.password')).sendKeys('3');
        element(by.id('loginButton')).click().then(function(){
            browser.waitForAngular();
            expect(browser.getCurrentUrl()).toContain('app/home');
        });
    });
});
