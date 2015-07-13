var Allure = require('allure-js-commons');
var _ = require('lodash');
var path = require('path');

/**
 * See <a href="https://github.com/angular/protractor/blob/master/docs/plugins.md#writing-plugins">the docs</a>
 * on how the plugins are written for Protractor.
 * @constructor
 */
function AllureReporter(allure) {
  var STATUS_PASSED = 'passed', STATUS_FAILED = 'failed';
  this.allure = allure || new Allure();
  this.currentSuite = null;
  this.prevCaseEnd = null;
  /**
   * Current steps and root steps are recorded inside of the reporter to be flushed into Allure after test case ends
   * Root is a reverse view of Current steps - the latter is an array of children that reference their parent, the
   * former is an array of root steps referencing their children.
   */
  this.currentSteps = [];
  this.rootSteps = [];

  this.setup = function(userDefinedConfig) {
    var pluginConfig = {allureReport: {resultsDir: 'allure-results'}, basePath: '.'};
    pluginConfig = _.defaultsDeep(userDefinedConfig, pluginConfig);
    var outDir = path.resolve(pluginConfig.basePath, pluginConfig.allureReport.resultsDir);
    this.allure.setOptions({targetDir: outDir});
    this.prevCaseEnd = Date.now();
    return this;
  };

  this.teardown = function() {
    this.allure.endSuite(Date.now());
  };

  this.postTest = function(config, passed, testInfo) {
    if (!this.currentSuite) {
      this.allure.startSuite(testInfo.name, this.prevCaseEnd);
    }
    this.allure.startCase(testInfo.category, this.prevCaseEnd);
    this.addStepsToAllure(this.allure, this.rootSteps);
    this.allure.endCase(passed ? STATUS_PASSED : STATUS_FAILED, null, Date.now());
    if (this.currentSuite && this.currentSuite !== testInfo.name) {
      this.allure.endSuite(Date.now());
      this.allure.startSuite(testInfo.name);
    }
    this.currentSuite = testInfo.name;
    this.prevCaseEnd = Date.now();

    this.currentSteps = [];
    this.rootSteps = [];
    this.currentStep = null;
  };
  this.addStepsToAllure = function(allure, steps) {
    for(var i = 0; i < steps.length; i++) {
      var step = steps[i];
      allure.startStep(step.name, step.dateTime);
      this.addStepsToAllure(allure, step.steps);
      allure.endStep(step.status, step.endDateTime);
    }
  };
  this.startStep = function(stepName, dateTime) {
    var newStep = {name: stepName, dateTime: dateTime || Date.now(), steps: []};
    newStep.parent = this.currentStep;
    if (!this.currentStep) {
      this.currentSteps.push(newStep);
      this.rootSteps.push(newStep);
    } else {
      this.currentStep.steps.push(newStep);
    }
    this.currentStep = newStep;
    return this;
  };
  this.endStep = function(status) {
    this.currentStep.endDateTime = Date.now();
    this.currentStep.status = status || STATUS_PASSED;
    this.currentStep = this.currentStep.parent;
    return this;
  };
  this.postResults = function(config) {
  };
}

var allureReporter = new AllureReporter();
module.exports.AllureReporter = AllureReporter;
module.exports.allureReporter = allureReporter;
module.exports.setup = allureReporter.setup.bind(allureReporter);
module.exports.teardown = allureReporter.teardown.bind(allureReporter);
module.exports.postResults = allureReporter.postResults.bind(allureReporter);
module.exports.postTest = allureReporter.postTest.bind(allureReporter);
module.exports.name = 'Allure Reporter';