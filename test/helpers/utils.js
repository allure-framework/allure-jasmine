var Reporter = require('../../src/Jasmine2AllureReporter.js').Jasmine2AllureReporter;
var Allure = require('allure-js-commons');
var path = require('path');
var rs = require('random-strings');

function testAllure() {
  var allure = new Allure();
  //using maven conventions (target dir)
  allure.setOptions({targetDir: path.resolve('.', 'target')});
  return allure;
}

function jasmineReporter() {
  return new Reporter({}, testAllure());
}

function runSpecs(number) {
  console.info('Running ' + number + ' of specs');
  var specs = [];
  specs.randomSpecIndex = function() {return lesserDigit(this.length)};
  for (var i = 0; i < number; i++) {
    var spec = {description: rs.alphaNumMixed(10), fullName: rs.alphaNumMixed(10), status: 'passed'};
    this.specStarted(spec);
    this.specDone(spec);
    specs.push(spec);
  }
  return specs;
}

function noZeroDigit() {
  var noZeroAlphabet = '123456789';
  var random = rs.random(1, noZeroAlphabet);
  return +random;
}

function lesserDigit(digit) {
  var alphabet = '';
  for(var i = 0; i < digit; i++){
    alphabet += i;
  }
  return +rs.random(1, alphabet);
}

exports.testAllure = testAllure;
exports.runSpecs = runSpecs;
exports.noZeroDigit = noZeroDigit;
exports.lesserDigit = lesserDigit;
exports.jasmineReporter = jasmineReporter;