'use strict';
// require
var AWS     = require('aws-sdk');
var Promise = require('bluebird');

module.exports = function (grunt) {
  // register tasks
  grunt.registerMultiTask('aws', 'execute function of aws-sdk', function () {
    // initialize
    var done    = this.async();
    var options = this.options();
    // create instance
    var Service = AWS[options.service];
    if (!Service) {
      grunt.log.error('Not found service `' + options.service + '`');
      done(false);
      return;
    }
    var service = Promise.promisifyAll(new Service(), {suffix: 'Promise'});
    var action  = service[options.action + 'Promise'];
    if (!action) {
      grunt.log.error('Not found action `' + options.action + '` in `' + options.service + '`');
      done(false);
      return;
    }
    // create params
    var params = {};
    Object.keys(options.params).forEach(function(key) {
      params[key.charAt(0).toUpperCase() + key.slice(1)] = options.params[key];
    });
    // invoke api
    var successCallback = options.success;
    var errorCallback   = options.error;
    (function retry() {
      action.call(service, params).then(function(data) {
        if (!!successCallback) {
          successCallback(data, done, function() { setTimeout(retry, options.retryInterval || 1000); });
        } else {
          done();
        }

      }).catch(function(err) {
        if (!!errorCallback) {
          errorCallback(err, done, { setTimeout(retry, options.retryInterval || 1000); });
        } else {
          grunt.log.error(err);
          done(false);
        }
      });
    })();
  });

};
