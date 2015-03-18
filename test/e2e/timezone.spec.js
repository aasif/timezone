
// Describe a feature
describe('Timezone Testing', function(){
    it('should add timezone', function(){
        element(by.css('.add-timezone')).click().then(function(){

            element(by.model('timezone.name')).sendKeys('Testing');
            element(by.model('timezone.city')).sendKeys('Test City');
            element(by.model('slider')).sendKeys(5);
            element(by.css('.save-timezone')).click();

            var timezone = element.all(by.css('.timezone')).get(0);
            expect(timezone.element(by.css('.timezone-name')).getText()).toContain('Testing');
        });
    });

    it('should edit timezone', function(){
        var timezone = element.all(by.css('.timezone')).get(0);
        element(by.css('.toggle-edited')).click();

        timezone.element(by.css('.edit-timezone')).click();
        element(by.model('timezone.name')).sendKeys(' Updated');
        element(by.css('.save-timezone')).click();

        element(by.css('.toggle-edited')).click();

        expect(timezone.element(by.css('.timezone-name')).getText()).toContain('Updated');
        //expect(timezone.element(by.css('.timezone-name')).getText()).toContain('Testing');        
    });

    it('should delete timezone', function(){
        var timezone = element.all(by.css('.timezone')).get(0);
        element(by.css('.toggle-deleted')).click();
        timezone.element(by.css('.delete-timezone')).click();
        expect(element.all(by.css('.timezone')).length).toBe(undefined);
    });
});
