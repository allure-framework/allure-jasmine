"use strict";
var Runtime = require('allure-js-commons/runtime');
var Jasmine2AllureReporter = require('./src/Jasmine2AllureReporter.js');
var allureReporter = Jasmine2AllureReporter.allureReporter;

module.exports = Jasmine2AllureReporter.Jasmine2AllureReporter;
global.allure = new Runtime(allureReporter);
