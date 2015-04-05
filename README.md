# grunt-thin-aws

[![Dependency Status](https://david-dm.org/k-kinzal/grunt-thin-aws.svg)](https://david-dm.org/k-kinzal/grunt-thin-aws)
[![devDependency Status](https://david-dm.org/k-kinzal/grunt-thin-aws/dev-status.svg)](https://david-dm.org/k-kinzal/grunt-thin-aws#info=devDependencies)

> AWS SDK Wrapper for grunt task

## Getting Started
This plugin requires Grunt.

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-thin-aws --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-thin-aws');
```

## The "aws" task

### Overview
In your project's Gruntfile, add a section named `aws` to the data object passed into `grunt.initConfig()`.


```js
Config({
  aws: {
    debug: {
      options: {
        service: 'Lambda',
        action: 'invokeAsync',
        params: {
          functionName: 'hello-world',
          invokeArgs: JSON.stringify({
            hoge: 'piyo',
          })
        },
        success: function(data, done, retry) {
          if (data.Status != 202) {
            retry();
          }
          console.log(data);
          done();
        }
      }
    }
  },
})
```

## License
Copyright (c) 2012-2015 k-kinzal. Licensed under the MIT license.