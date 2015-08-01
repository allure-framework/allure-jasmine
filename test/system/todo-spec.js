describe('angularjs homepage', function() {
  describe('describe inside of describe that pass', function() {
    it('one step must pass', function() {
      browser.get('https://angularjs.org');
      allure.createStep('Opening main page', function(){})();

      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();
      var todoList = element.all(by.repeater('todo in todoList.todos'));
      expect(todoList.count()).toEqual(3);
      expect(todoList.get(2).getText()).toEqual('write first protractor test');

      todoList.get(2).element(by.css('input')).click();
      var completedAmount = element.all(by.css('.done-true'));
      expect(completedAmount.count()).toEqual(2);
    });

  });

  it('nested step must pass', function() {
    browser.get('https://angularjs.org');
    allure.createStep('Filling data', function () {
      allure.createStep('Fill todo text', function () {})();
      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();
    })();

    allure.createStep('Soon will calc number of items in todo', function(){})();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
  });
  it('can do screenshots', function() {
    browser.get('https://angularjs.org');
    allure.createStep('Filling data', function() {
      allure.createStep('Fill todo text', function () {})();
      element(by.model('todoList.todoText')).sendKeys('write first protractor test');
      element(by.css('[value="add"]')).click();

      allure.createStep('This step will not be ended', function () {})();
    })();

    var todoList = element.all(by.repeater('todo in todoList.todos'));
    expect(todoList.count()).toEqual(3);
    expect(todoList.get(2).getText()).toEqual('write first protractor test');

    // You wrote your first test, cross it off the list
    todoList.get(2).element(by.css('input')).click();
    var completedAmount = element.all(by.css('.done-true'));
    expect(completedAmount.count()).toEqual(2);
    allure.createStep('Checking screenshots', function () {
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Main page', function () {return new Buffer(png, 'base64')}, 'image/png')();
      });
    })();
  });
  it('one pending it() needs to spoil the suite', function() {
    expect(false).toBe(true);
  });
  xit('other its() passed, but this one is disabled');

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
