exports.config = {
  seleniumAddress: 'http://localhost:4444/wd/hub',
  specs: ['todo-spec.js'],
  plugins: [{
    path: '../../src/AllureReporter.js',
    allureReport: {
      resultsDir: 'allure-results'
    }
  }]
};
