/*!
 * customize-engine-uglify <https://github.com/nknapp/customize-engine-uglify>
 *
 * Copyright (c) 2016 Nils Knappmeier.
 * Released under the MIT license.
 */
'use strict'

var _ = require('lodash')
var uglify = require('uglify-js')
var orderFiles = require('./lib/orderFiles')

module.exports = {
  schema: require('./schema.js'),

  defaultConfig: {
    files: {},
    dependencies: {},
    options: {
      outFileName: 'bundle.js',
      outSourceMap: 'bundle.js.map',
      output: {
        comments: /(@license|@preserve|^!)/
      }
    }
  },

  preprocessConfig: function (config) {
    // No preprocessing needed at the moment, since we just merge objects
    return config
  },

  watched: function (config) {
    return _.values(config.files)
  },

  /**
   * Run uglify and store the resulting JavaScript and Source-Map into the result object
   * @param config
   */
  run: function (config) {
    var inputFileOrder = orderFiles(Object.keys(config.files), config.dependencies)
    var inputFiles = inputFileOrder.map(function (filename) {
      return config.files[filename]
    })
    var outputFiles = {}
    if (inputFiles.length === 0) {
      outputFiles[config.options.outFileName] = ''
      return outputFiles
    }
    var result = uglify.minify(inputFiles, config.options)
    outputFiles[config.options.outFileName] = result.code
    outputFiles[config.options.outSourceMap] = result.map
    return outputFiles
  }
}

