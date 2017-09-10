describe('failing angularjs homepage', function () {
  describe('todo list inside nested describe()', function () {
    it('step that throws error', function () {
      allure.createStep('Opening main page', function () {throw Error('Expected error to test failing step')})();

      // the code bellow should not be called
      browser.get('https://angularjs.org');

      allure.createStep('Step after failure', function () {})();
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

    // the code bellow should not be called
    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(1).getText()).toEqual('write first protractor test');

    allure.createStep('Step after failure', function () {})();
  });
  xit('other its() failed, but this one is disabled');

  xdescribe('skipped describe()', function () {
    xit('skipped it() inside of skipped describe()', function () {
    });
    it('empty it() inside skipped describe()');
  });
  describe('describe with empty it()', function () {
    xit('empty & skipped it()');
  });
});
