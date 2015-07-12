var path = require('path');
var Allure = require('allure-js-commons');
var Reporter = require('../../src/AllureReporter.js').AllureReporter;
var testAllure = require('../helpers/utils.js').testAllure;

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
    it('must report one case if one test was run', function() {
      var reporter = new Reporter();
      reporter.postTest({}, true, {name: 'describe', category: 'it'});

      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases.length).toBe(1);
      expect(testcases[0].name).toBe('it');
    });
    it('must report 2 cases in one suite', function() {
      var reporter = new Reporter();
      reporter.postTest({}, true, {name: 'describe', category: 'it1'});
      reporter.postTest({}, true, {name: 'describe', category: 'it2'});

      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases.length).toBe(2);
      expect(testcases[0].name).toBe('it1');
      expect(testcases[1].name).toBe('it2');
    });
    it('finishes 1st test case when 2nd is started', function() {
      var reporter = new Reporter();
      reporter.postTest({}, true, {name: 'describe', category: 'it1'});
      reporter.postTest({}, true, {name: 'describe', category: 'it2'});

      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases[0].stop).toBeDefined();
      expect(testcases[0].status).toBeTruthy();
    });
    it('finishes suite when teardown happens', function() {
      var reporter = new Reporter(testAllure());
      reporter.postTest({}, true, {name: 'describe', category: 'it1'});
      reporter.teardown();

      expect(reporter.allure.suites.length).toBe(0);
    });
    it('adds steps to testcase if step was added from tests', function() {
      var reporter = new Reporter(testAllure());
      reporter.postTest({}, true, {name: 'describe', category: 'it1'});
      reporter.startStep('step');

      expect(reporter.allure.getCurrentSuite().testcases[0].steps[0].name).toBe('step');
    });
  });
});
