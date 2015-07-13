var allure = require('../../src/AllureReporter.js').allureReporter;

describe('angularjs homepage', function() {
  describe('todo list inside nested describe()', function() {
    it('todo', function() {
      browser.get('https://angularjs.org');
      allure.startStep('Opening main page').endStep();

      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();

      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');

      // You wrote your first test, cross it off the list
      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });

  });

  it('one more todo', function() {
    browser.get('https://angularjs.org');
    allure.startStep('Filling data');
    allure.startStep('Fill todo text').endStep();
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();
    allure.endStep();

    allure.startStep('This step will not be ended');

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });

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
