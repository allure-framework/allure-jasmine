# protractor-allure-plugin
A plugin to generate an Allure report out of Protractor run (still in development)

## Configuration

Add the lib into `package.json` and then add allure into `plugins` section of protractor config.
Allure-reporter has a single config option, it's a `resultsDir` &mdash; result files location relatively to base dir. 
By default, files save in `allure-results` dir.

```js
// conf.js
exports.config = {
  plugins: [{
    package: 'protractor-allure-reporter',
    allureReport: {
      resultsDir: 'allure-results'
    }
  }]
};
```


# For Developers

See the [system tests](test/system) to quickly check how the reporter works in real life.