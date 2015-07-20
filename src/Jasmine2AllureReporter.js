var Allure = require('allure-js-commons');
var path = require('path');

function Jasmine2AllureReporter(userDefinedConfig, allure) {
  var Status = {PASSED: 'passed', FAILED: 'failed', BROKEN: 'broken', PENDING: 'pending'};
  this.allure = allure || new Allure();

  this.configure = function(userDefinedConfig) {
    var pluginConfig = {};
    userDefinedConfig = userDefinedConfig || {};
    pluginConfig.resultsDir = userDefinedConfig.resultsDir || 'allure-results';
    pluginConfig.basePath = userDefinedConfig.basePath || '.';
    var outDir = path.resolve(pluginConfig.basePath, pluginConfig.resultsDir);
    this.allure.setOptions({targetDir: outDir});
  };
  this.configure(userDefinedConfig);

  this.suiteStarted = function(suite) {
    this.allure.startSuite(suite.fullName);
  };
  this.suiteDone = function() {
    this.allure.endSuite();
  };
  this.specStarted = function(spec) {
    this.allure.startCase(spec.description);
  };
  this.specDone = function(spec) {
    var status = this._getTestcaseStatus(spec.status);
    var errorInfo = this._getTestcaseError(spec);
    this.allure.endCase(status, errorInfo);
  };
  /**
   * @param attachmentName
   * @param buffer bytes or string
   * @param mimeType optional, will be determined automagically
   */
  this.addAttachment = function(attachmentName, buffer, mimeType) {
    this.allure.addAttachment(attachmentName, buffer, mimeType);
  };
  /**
   * Adds attachment, but first decodes base64 {@code dataAsString}.
   * @param attachmentName
   * @param dataAsString bytes or string
   * @param mimeType optional, will be determined automagically
   */
  this.addBase64Attachment = function(attachmentName, dataAsString, mimeType) {
    this.allure.addAttachment(attachmentName, new Buffer(dataAsString, 'base64'), mimeType);
  };
  /**
   * Starts a step. It's not invoked by Jasmine - this method is for manual use or to build some kind of AOP framework
   * around test code. {@link #endStep()} MUST be invoked afterwards, otherwise the report will be built with errors
   * since end date & status of the step won't be set.
   *
   * @param stepName this string will appear in the final test report within a test case
   * @param dateTime optional, shows when the step happened
   */
  this.startStep = function(stepName, dateTime) {
    this.allure.startStep(stepName, dateTime || Date.now())
  };
  /**
   * Finishes the step that was started by . It's not invoked by Jasmine - this method is for manual use or to build
   * some kind of AOP framework around the test code.
   * @param status pass "failed" or "passed" as arguments to make it appear green or red. This doesn't impact the status
   * of the test case itself.
   * @param dateTime optional, shows when the step finished
   */
  this.endStep = function(status, dateTime) {
    this.allure.endStep(status, dateTime || Date.now())
  };
  /**
   * Sometimes users want to log a message in the report manually. This method is to log such string for a "green" step.
   * This step won't have any sub-steps since it's finished right here.
   * @param stepName a step string that will appear in the final report
   */
  this.passedStep = function(stepName) {
    this.startStep(stepName);
    this.endStep(Status.PASSED);
  };
  /**
   * Sometimes users want to log a message in the report manually. This method is to log such string for a "red" step.
   * This step won't have any sub-steps since it's finished right here.
   * @param stepName a step string that will appear in the final report
   */
  this.failedStep = function(stepName) {
    this.startStep(stepName);
    this.endStep(Status.FAILED);
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
        message: 'This test has not been implemented yet',
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

/**
 * Useful when users want to add info (like manually added steps) right from steps. To use it correctly it should be
 * both used as a reporter for Jasmine/Protractor/etc and in the tests.
 * @type {Jasmine2AllureReporter}
 */
module.exports.singleton = new Jasmine2AllureReporter();
/**
 * Usually it's preferred to use {@code module.exports.singleton}, but if for some reason you need a brand new instance
 * of the reporter, give it a shot.
 * @type {Jasmine2AllureReporter}
 */
module.exports.Jasmine2AllureReporter = Jasmine2AllureReporter;