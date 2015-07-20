# protractor-allure-plugin
A plugin to generate an Allure report out of Jasmine tests.

## Using Allure Reporter in Jasmine2

Add the lib into `package.json` and then configure the plugin:

```js
// conf.js
    var jasmineAllureReporter = require('jasmine-allure-reporter').Jasmine2AllureReporter.singleton;
    jasmineAllureReporter.configure({
      allureReport: {
        resultsDir: 'allure-results'
      }
    });
    jasmine.getEnv().addReporter(jasmineAllureReporter);
```

### Using Allure Reporter in Protractor

Put the above code into the `onPrepare` inside of your `conf.js`:
```js
// conf.js
exports.config = {
  framework: 'jasmine2',
  onPrepare: function() {
    var jasmineAllureReporter = require('jasmine-allure-reporter').Jasmine2AllureReporter.singleton;
    jasmineAllureReporter.configure({
      allureReport: {
        resultsDir: 'allure-results'
      }
    });
    jasmine.getEnv().addReporter(jasmineAllureReporter);
  }
}
```

## TBD
- Currently attachments are added to the test case instead of the current step. This needs to be fixed in 
 `allure-js-commons`.
- Add support for Labels and Features.
- Add support to Jasmine1. Right now only Jasmine2 is available (do we really need this?).

# For Developers

See the [system tests](test/system) to quickly check how the reporter works in real life:
`node_modules/protractor/bin/protractor ./test/system/conf.js`