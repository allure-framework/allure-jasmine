var Allure = require('allure-js-commons');
var path = require('path');
var jasmine2Allure = new Allure();

/**
 *
 * @param userDefinedConfig configuration that overrides defaults
 * @param allureReporter optional Allure. If not specified, a global Allure is going to be used. Usually you shouldn't
 *        override it - mostly used for unit testing.
 * @constructor
 */
function Jasmine2AllureReporter(userDefinedConfig, allureReporter) {
  var Status = {PASSED: 'passed', FAILED: 'failed', BROKEN: 'broken', PENDING: 'pending'};
  this.jasmine2Allure = allureReporter || jasmine2Allure;

  this.configure = function(userDefinedConfig) {
    var pluginConfig = {};
    userDefinedConfig = userDefinedConfig || {};
    pluginConfig.resultsDir = userDefinedConfig.resultsDir || 'allure-results';
    pluginConfig.basePath = userDefinedConfig.basePath || '.';
    var outDir = path.resolve(pluginConfig.basePath, pluginConfig.resultsDir);
    this.jasmine2Allure.setOptions({targetDir: outDir});
  };
  this.configure(userDefinedConfig);

  this.suiteStarted = function(suite) {
    this.jasmine2Allure.startSuite(suite.fullName);
  };
  this.suiteDone = function() {
    this.jasmine2Allure.endSuite();
  };
  this.specStarted = function(spec) {
    this.jasmine2Allure.startCase(spec.description);
  };
  this.specDone = function(spec) {
    var status = this._getTestcaseStatus(spec.status);
    var errorInfo = this._getTestcaseError(spec);
    this.jasmine2Allure.endCase(status, errorInfo);
  };
  this._getTestcaseStatus = function(status) {
    if (status === 'disabled' || status === 'pending') {
      return Status.PENDING;
    } else if (status === 'passed') {
      return Status.PASSED;
    } else {
      return Status.FAILED;
    }
  };
  this._getTestcaseError = function(result) {
    if (result.status === 'disabled') {
      return {
        message: 'This test was ignored',
        stack: ''
      };
    } else if (result.status === 'pending') {
      return {
        message: result.pendingReason,
        stack: ''
      };
    }
    var failure = result.failedExpectations ? result.failedExpectations[0] : null;
    if (failure) {
      return {
        message: failure.message,
        stack: failure.stack
      };
    }
  };

}

exports.allureReporter = jasmine2Allure;
/**
 * Usually it's preferred to use {@code module.exports.singleton}, but if for some reason you need a brand new instance
 * of the reporter, give it a shot.
 * @type {Jasmine2AllureReporter}
 */
exports.Jasmine2AllureReporter = Jasmine2AllureReporter;
