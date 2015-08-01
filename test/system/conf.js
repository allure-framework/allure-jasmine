exports.config = {
  framework: 'jasmine2',
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['todo-spec.js', 'todo-spec-failing.js'],
  capabilities: {
    'browserName': 'firefox'
  },

  onPrepare: function() {
    var AllureReporter = require('../../index.js');
    jasmine.getEnv().addReporter(new AllureReporter({
      allureReport: {
        resultsDir: 'allure-results'
      }
    }));
  }
};
