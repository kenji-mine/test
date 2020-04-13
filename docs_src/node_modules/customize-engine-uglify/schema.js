/**
 * Returns a JSON-Schema for the configuration object.
 */
module.exports = {
  description: 'The configuration schema of the "customize-engine-uglify"',
  type: 'object',
  properties: {
    'files': {
      description: 'A name-path mapping of javascript-files',
      additionalProperties: {
        type: 'string',
        description: 'The path to the javascript-file. The key of the property is assumed to be the internal name for customize-overrides.'
      }
    },
    'dependencies': {
      description: 'A one-to-multiple mapping of filenames to their dependencies. Both keys and items of the value array must be keys in the "files" property. ' +
      'Dependencies of a file will always be included into the bundle before the file itself.',
      additionalProperties: {
        type: 'array',
        items: {
          description: 'The filename of a dependency',
          type: 'string'
        }
      }
    },
    'options': {
      description: 'Options to pass to uglify. (see https://github.com/mishoo/UglifyJS2#api-reference)',
      type: 'object',
      properties: {
        'outSourceMap': {
          type: 'string'
        },
        'outFileName': {
          type: 'string'
        }
      }
    }
  }
}
