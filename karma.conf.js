// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html
const build = process.env.NODE_ENV === 'build';

module.exports = function( config ) {
  config.set({
    basePath  : '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins   : [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-mocha-reporter'),
      require('@angular-devkit/build-angular/plugins/karma')
    ],
    client    : {
      clearContext: false
    },
    angularCli: {
      environment: 'dev'
    },
    reporters : ['mocha'],
    port      : 9876,
    colors    : true,
    logLevel  : config.LOG_INFO,
    autoWatch : true,
    browsers  : [build ? 'ChromeHeadless' : 'Chrome'],
    singleRun : build ? true : false
  });
};