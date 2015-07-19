var allure = require('../../src/Jasmine2AllureReporter.js').singleton;

describe('failing angularjs homepage', function() {
  describe('todo list inside nested describe()', function() {
    it('todo', function() {
      allure.failedStep('Opening main page');
      browser.get('https://angularjs.org');
      allure.startStep('Checking screenshots');
      browser.takeScreenshot().then(function(png) {
        allure.addBase64Attachment('Main page', png);
      });
      allure.endStep('passed');

      allure.startStep('Checking txt attachments');
      allure.addAttachment('Text Attachment', 'let it be text');
      allure.endStep('passed');

      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();

      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');

      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(1);
    });

  });

  it('one more todo', function() {
    browser.get('https://angularjs.org');
    allure.startStep('Filling data');
    allure.startStep('Fill todo text');
    allure.endStep();
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    allure.startStep('another internal step');
    allure.endStep('failed');
    allure.endStep('failed');

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(1).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
  xit('other its() failed, but this one is disabled');

  xdescribe('skipped describe()', function() {
    xit('skipped it() inside of skipped describe()', function() {
    });
    it('empty it() inside skipped describe()');
  });
  xdescribe('empty & skipped describe');
  describe('describe with empty it()', function() {
    xit('empty & skipped it()');
  });
});
