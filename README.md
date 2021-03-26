# [DEPRECATED]
## Please follow https://github.com/allure-framework/allure-js

# Jasmine Allure Plugin

A plugin to generate an Allure report out of Jasmine tests.

## Using Allure Reporter in Jasmine2

Add the lib into `package.json` and then configure the plugin:

```js
// conf.js
var AllureReporter = require('jasmine-allure-reporter');
jasmine.getEnv().addReporter(new AllureReporter({
  resultsDir: 'allure-results'
}));
```
### Using Allure Reporter in Protractor

Put the above code into the `onPrepare` inside of your `conf.js`:
```js
// conf.js
exports.config = {
  framework: 'jasmine2',
  onPrepare: function() {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter({
      resultsDir: 'allure-results'
    }));
  }
}
```

## Generate HTML report from Allure results

The Reporter will generate xml files inside of a `resultsDir`, then we need to generate HTML out of them. 

### Using Allure Command Line Tool
Add the `allure-commandline` dependency in your current project by running the below command.

```npm install allure-commandline --save-dev```

After this, you can add `"posttest": "allure generate allure-results --clean -o allure-report"` section into your `package.json`. So when running the test by using `npm test` , the command mensioned in the `posttest` will help you to generate the report. You can refer a sample `script` section of `package.json` file.
```json
"scripts": {
        "pretest": "rm -rf allure-report",
        "test": "protractor conf.js",
        "posttest": "allure generate allure-results --clean -o allure-report || true"
    }
```
Added the bash `||` operator in `posttest` to overcome this [issue](https://stackoverflow.com/questions/25292344/npm-posttest-doesnt-trigger-if-npm-test-fails)


Otherwise choose [one of other ways to generate HTML](https://github.com/allure-framework/allure-core/wiki#generating-a-report).

## Adding Screenshot in the end of each test

```javascript
  onPrepare: function () {
    var AllureReporter = require('jasmine-allure-reporter');
    jasmine.getEnv().addReporter(new AllureReporter());
    jasmine.getEnv().afterEach(function(done){
      browser.takeScreenshot().then(function (png) {
        allure.createAttachment('Screenshot', function () {
          return new Buffer(png, 'base64')
        }, 'image/png')();
        done();
      })
    });
  }
```
Note `done` callback! 

## TBD
- Currently attachments are added to the test case instead of the current step. This needs to be fixed in 
 `allure-js-commons`.
- Add support for Features.
- Add support to Jasmine1. Right now only Jasmine2 is available (do we really need this?).
- Add ability to use reflection for decoration method of page objects so that we don't need to write Allure-related
 boilerplate tying ourselves to one specific reporter.

# For Developers

See the [system tests](test/system) to quickly check how the reporter works in real life:
`node_modules/protractor/bin/protractor ./test/system/conf.js`
