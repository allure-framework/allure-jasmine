var path = require('path');
var Allure = require('allure-js-commons');
var Reporter = require('../../src/Jasmine2AllureReporter.js').Jasmine2AllureReporter;
var utils = require('../helpers/utils.js');
var noZeroDigit = utils.noZeroDigit;
var jasmineReporter = utils.jasmineReporter;

describe('AllureReporter', function() {
  Reporter.prototype.runSpecs = utils.runSpecs;
  it('must use allure-results as default out dir', function() {
    var reporter = new Reporter({}, new Allure());
    expect(reporter.allure.options.targetDir).toBe(path.resolve('.', 'allure-results'));
  });
  it('must use allure report dir when it is configured', function() {
    var reporter = new Reporter({resultsDir: 'reports'});
    expect(reporter.allure.options.targetDir).toBe(path.resolve('.', 'reports'));
  });
  describe('reporting', function() {
    it('uses describe() as suite name', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});

      expect(reporter.allure.suites.length).toBe(1);
      expect(reporter.allure.getCurrentSuite().name).toBe('describe');
    });
    it('finishes suite when jasmine reported it is done', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.suiteDone({fullName: 'describe'});

      expect(reporter.allure.suites.length).toBe(0);
    });
    it('must report one suite if one test was run', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.specDone({status: 'passed'});

      expect(reporter.allure.suites.length).toBe(1);
      expect(reporter.allure.getCurrentSuite().name).toBe('describe');
    });
    it('must report one case if one test was run', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.specDone({status: 'passed'});

      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases.length).toBe(1);
      expect(testcases[0].name).toBe('it');
    });
    it('must report N cases in one suite', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      var specs = reporter.runSpecs(noZeroDigit());

      expect(reporter.allure.getCurrentSuite().name).toBe('describe');
      var testcases = reporter.allure.getCurrentSuite().testcases;
      expect(testcases.length).toBe(specs.length);
      var specIndex = specs.randomSpecIndex();
      expect(testcases[specIndex].name).toBe(specs[specIndex].description);
    });
    it('finishes case when jasmine reports it is done', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.endStep('passed');

      expect(reporter.allure.getCurrentSuite().testcases[0].status).toBe('passed');
    });
    it('marks case as pending when jasmine reports it as skipped', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.specDone({status: 'passed'});

      expect(reporter.allure.getCurrentSuite().testcases[0].status).toBe('passed');
    });
    it('adds steps to testcase if step was added from tests', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.startStep('step');

      expect(reporter.allure.getCurrentSuite().testcases[0].steps[0].name).toBe('step');
    });
    it('adds nested steps inside of other steps', function() {
      var reporter = jasmineReporter();
      reporter.suiteStarted({fullName: 'describe'});
      reporter.specStarted({description: 'it'});
      reporter.startStep('step1');
      reporter.startStep('nested');

      expect(reporter.allure.getCurrentSuite().testcases[0].steps[0].steps[0].name).toBe('nested');
    });

    xit('starts fit() in a default suite', function() {
    });
    xit('finishes fit() in a default suite', function() {
    });
  });
});
