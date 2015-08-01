describe('failing angularjs homepage', function () {
  describe('todo list inside nested describe()', function () {
    it('step that throws error and makes screenshot', function () {
      allure.createStep('Opening main page', function () {throw Error('Expected error to test failing step')})();
      browser.get('https://angularjs.org');

      allure.createStep('Checking txt attachments', function () {
        allure.createAttachment('Text Attachment', function () {return 'let it be text'}, 'text/plain')();
      })();

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

  it('one more todo', function () {
    browser.get('https://angularjs.org');
    allure.createStep('Filling data', function () {
      allure.createStep('Fill todo text', function () {})();
    })();
    element(by.model('todoList.todoText')).sendKeys('write first protractor test');
    element(by.css('[value="add"]')).click();

    allure.createStep('another internal step', function () {
      allure.createStep('failed', function () {throw new Error('Expected error to test failing step')})();
    })();
    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(1).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
  xit('other its() failed, but this one is disabled');

  xdescribe('skipped describe()', function () {
    xit('skipped it() inside of skipped describe()', function () {
    });
    it('empty it() inside skipped describe()');
  });
  xdescribe('empty & skipped describe');
  describe('describe with empty it()', function () {
    xit('empty & skipped it()');
  });
});
