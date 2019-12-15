const glob = require('glob')
const fs = require('fs')
const marked = require('marked')
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
          key: /__FACEBOOK_APP_ID__/g,
          value: process.env.FACEBOOK_APP_ID
        },
        {
          key: /__FACEBOOK_APP_VERSION__/g,
          value: process.env.FACEBOOK_APP_VERSION
        },
        {
          key: /__ENV__/g,
          value: process.env.NODE_ENV
        },
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
  },
  hooks: {
    preCompile () {
      let paths = glob.sync('./app/_md/*.md')
      for (let path of paths) {
        let md = fs.readFileSync(path).toString()
        let html = marked(md)
        let outputPath = path.replace('_md/', 'assets/').replace('.md', '.html')
        fs.writeFileSync(outputPath, html)
      }
      return Promise.resolve()
    }
  }
}
