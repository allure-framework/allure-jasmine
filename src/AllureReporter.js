'use strict';
/**
 * See <a href="https://github.com/angular/protractor/blob/master/docs/plugins.md#writing-plugins">the docs</a>
 * on how the plugins are written for Protractor.
 * @constructor
 */
function AllureReporter() {
  this.setup = function() {
    console.log('Setup of Allure Reporter');
  };
  this.teardown = function() {
    console.log('Teardown of Allure Reporter');
  };
  this.postResults = function() {
    console.log('Post Results of Allure Reporter');
  };
  this.postTest = function() {
    console.log('Post Test of Allure Reporter');
  };
}

var allureReporter = new AllureReporter();
module.exports.setup = allureReporter.setup.bind(allureReporter);
module.exports.teardown = allureReporter.teardown.bind(allureReporter);
module.exports.postResults = allureReporter.postResults.bind(allureReporter);
module.exports.postTest = allureReporter.postTest.bind(allureReporter);
module.exports.name = 'Allure Reporter';