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
  this.globalStartTime = Date.now();
  this.currentSuite = null;
  this.currentCase = null;

  this.setup = function(userDefinedConfig) {
    var pluginConfig = {allureReport: {resultsDir: 'allure-results'}, basePath: '.'};
    pluginConfig = _.defaultsDeep(userDefinedConfig, pluginConfig);
    var outDir = path.resolve(pluginConfig.basePath, pluginConfig.allureReport.resultsDir);
    this.allure.setOptions({ targetDir: outDir });
    return this;
  };

  this.teardown = function() {
    this.allure.endSuite(Date.now());
  };

  this.postTest = function(config, passed, testInfo) {
    if(!this.currentSuite) {
      this.allure.startSuite(testInfo.name, this.globalStartTime);
    } else if(this.currentSuite !== testInfo.name) {
      this.allure.endSuite(Date.now());
      this.allure.startSuite(testInfo.name);
    }
    this.currentSuite = testInfo.name;

    this.allure.startCase(testInfo.category, Date.now());
    this.allure.endCase(passed, null, Date.now());
  };
  this.startStep = function(stepName) {
    this.currentCase.addStep(stepName);
  };
  this.endStep = function(){
    this.currentCase.endStep();
  };

  this.postResults = function(config) {};
}

var allureReporter = new AllureReporter();
module.exports.AllureReporter = AllureReporter;
module.exports.allureReporter = allureReporter;
module.exports.setup = allureReporter.setup.bind(allureReporter);
module.exports.teardown = allureReporter.teardown.bind(allureReporter);
module.exports.postResults = allureReporter.postResults.bind(allureReporter);
module.exports.postTest = allureReporter.postTest.bind(allureReporter);
module.exports.name = 'Allure Reporter';