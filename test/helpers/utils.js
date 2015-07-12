var Allure = require('allure-js-commons');
var path = require('path');

function testAllure() {
  var allure = new Allure();
  //using maven conventions (target dir)
  allure.setOptions({targetDir: path.resolve('.', 'target')});
  return allure;
}

module.exports.testAllure = testAllure;