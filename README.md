# protractor-allure-plugin
A plugin to generate an Allure report out of Jasmine tests.

## Configuration

Add the lib into `package.json` and then configure the plugin:

```js
// conf.js
    var jasmineAllureReporter = require('jasmine-allure-reporter').singleton;
    jasmineAllureReporter.configure({
      allureReport: {
        resultsDir: 'allure-results'
      }
    });
    jasmine.getEnv().addReporter(jasmineAllureReporter);
```


# For Developers

See the [system tests](test/system) to quickly check how the reporter works in real life.