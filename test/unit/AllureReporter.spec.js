var mockery = require('mockery');
var path = require('path');
var Allure = require('allure-js-commons');
var Reporter = require('../../src/AllureReporter.js').AllureReporter;

describe('AllureReporter', function() {
  it('must use allure-results as default out dir', function() {
    var reporter = new Reporter(new Allure()).setup({});
    expect(reporter.allure.options.targetDir).toBe(path.resolve('.', 'allure-results'));
  });

  it('must use allure report dir when it is configured', function() {
    var reporter = new Reporter().setup({allureReport: {resultsDir: 'reports'}});
    expect(reporter.allure.options.targetDir).toBe(path.resolve('.', 'reports'));
  });

  describe('reporting', function() {
    it('must report one suite if one test was run', function() {
      var reporter = new Reporter();
      reporter.postTest({}, true, {name: 'describe', category: 'it'});

      expect(reporter.allure.suites.length).toBe(1);
      expect(reporter.allure.getCurrentSuite().name).toBe('describe');
    });
    it('must report one case if one test was run', function(){
      var reporter = new Reporter();
      reporter.postTest({}, true, {name: 'describe', category: 'it'});

      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases.length).toBe(1);
      expect(testcases[0].name).toBe('it');
    });

  });
});
