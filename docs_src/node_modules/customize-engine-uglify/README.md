# customize-engine-uglify 

[![NPM version](https://badge.fury.io/js/customize-engine-uglify.svg)](http://badge.fury.io/js/customize-engine-uglify)
[![Travis Build Status](https://travis-ci.org/bootprint/customize-engine-uglify.svg?branch=master)](https://travis-ci.org/bootprint/customize-engine-uglify)
[![Coverage Status](https://img.shields.io/coveralls/bootprint/customize-engine-uglify.svg)](https://coveralls.io/r/bootprint/customize-engine-uglify)


> UglifyJS adapter for Customize


# Installation

```
npm install customize-engine-uglify
```

 
## Usage

The following example demonstrates how to use this module:

```js
var customize = require('customize')

// Load files from one directory and merge with a second one
customize()
  .registerEngine('uglify', require('customize-engine-uglify'))
  // Add two javascript files
  .merge({
    uglify: {
      files: {
        'a-browser-lib.js': require.resolve('./module1/a-browser-lib.js'),
        'another-browser-lib.js': require.resolve('./module1/another-browser-lib.js')
      },
      dependencies: {
        'a-browser-lib.js': [ 'another-browser-lib.js' ]
      }
    }
  })
  // Add another js file overriding "a-browser-lib.js"
  .merge({
    uglify: {
      files: {
        'a-browser-lib.js': require.resolve('./module2/overriding-browser-lib.js')
      }
    }
  })
  .run()
  .done(console.log)
```

This will generate the following output

```
{ uglify: 
   { 'bundle.js': 'console.log("another-browser-lib"),console.log("overriding-browser-lib");\n//# sourceMappingURL=bundle.js.map',
     'bundle.js.map': '{"version":3,"sources":["/home/nknappmeier/projects/bootprint/customize-engine-uglify/examples/module1/another-browser-lib.js","/home/nknappmeier/projects/bootprint/customize-engine-uglify/examples/module2/overriding-browser-lib.js"],"names":["console","log"],"mappings":"AAAAA,QAAQC,IAAI,uBCAZD,QAAQC,IAAI","file":"bundle.js"}' } }
```

##  API-reference




## License

`customize-engine-uglify` is published under the MIT-license. 
See [LICENSE.md](LICENSE.md) for details.

## Release-Notes
 
For release notes, see [CHANGELOG.md](CHANGELOG.md)
 
## Contributing guidelines

See [CONTRIBUTING.md](CONTRIBUTING.md).