var Allure = require('allure-js-commons'),
    Runtime = require('allure-js-commons/runtime'),
    _ = require('lodash');


/**
 * See <a href="https://github.com/angular/protractor/blob/master/docs/plugins.md#writing-plugins">the docs</a>
 * on how the plugins are written for Protractor.
 * @constructor
 */
function AllureReporter() {
  var STATUS_PASSED = 'passed', STATUS_FAILED = 'failed';
  this.setup = function(config) {
    this.tests = [];
    this.currentCase = '';
    this.allure = new Allure();
    this.allure.setOptions({
      targetDir: './reports/'
    });
    this.allure.startSuite(global.process.env.npm_package_description, Date.now());
  };

  this.teardown = function(config) {
  };

  this.postResults = function(config) {
    if (this.currentCase) {
      var errors = this.getErrorsForCase(this.currentCase);
      this.allure.endCase((errors.length === 0) ? STATUS_PASSED : STATUS_FAILED, errors, Date.now());
      this.currentCase = '';
    }

    this.allure.endSuite(Date.now());
  };

  this.postTest = function(config, passed, testInfo) {
    var info = testInfo;
    info.passed = passed;
    info.timestamp = Date.now();
    this.tests.push(info);

    if (this.currentCase != testInfo.name) {
      if (this.currentCase) {
        var errors = this.getErrorsForCase(this.currentCase);
        this.allure.endCase((errors.length == 0) ? STATUS_PASSED : STATUS_FAILED, errors, Date.now());
        this.currentCase = '';
      }

      this.allure.startCase(testInfo.name, Date.now());
      this.currentCase = testInfo.name;
    }

    this.allure.startStep(testInfo.category, Date.now());
    this.allure.endStep((passed) ? STATUS_PASSED : STATUS_FAILED, Date.now());
  };

  this.getErrorsForCase = function(caseName) {
    var result = [];

    _.map(this.tests, function() {
      if (this.name === caseName) {
        result.push({
          step: this.category,
          passed: this.passed,
          timestamp: this.timestamp
        });
      }
    });

    return result;
  }
}

var allureReporter = new AllureReporter();
module.exports.setup = allureReporter.setup.bind(allureReporter);
module.exports.teardown = allureReporter.teardown.bind(allureReporter);
module.exports.postResults = allureReporter.postResults.bind(allureReporter);
module.exports.postTest = allureReporter.postTest.bind(allureReporter);
module.exports.name = 'Allure Reporter';