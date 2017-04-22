const version = require('./package.json').version

const commit = require('child_process')
  .execSync('git rev-parse --short HEAD')
  .toString()
  .trim()

module.exports = {
  files: {
    javascripts: {
      joinTo: {
        'lib.js': [/^(?!app)/],
        'app.js': [/^app/]
      }
    },
    stylesheets: {
      joinTo: {
        'lib.css': [/^(?!app)/],
        'app.css': [/^app/]
      }
    },
    templates: {
      joinTo: 'app.js'
    }
  },
  npm: {
    globals: {
      jQuery: 'jquery'
    }
  },
  plugins: {
    babel: {
      presets: ['env', 'react']
    },
    postcss: {
      processors: [require('postcss-cssnext')]
    },
    replacer: {
      dict: [
        {
          key: /__VERSION__/g,
          value: version
        },
        {
          key: /__COMMIT__/g,
          value: commit
        }
      ]
    }
  }
}
