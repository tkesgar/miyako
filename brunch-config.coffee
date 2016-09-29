module.exports =

  files:
    javascripts: joinTo:
      'lib.js': /^(?!app)/
      'app.js': /^(app)/
    stylesheets: joinTo:
      'lib.css': /^(?!app)/
      'app.css': /^(app)/
    templates: joinTo: 'app.js'

  server:
    hostname: '0.0.0.0'

  plugins:
    babel:
      presets: ['latest', 'react']
    postcss:
      processors: [require('postcss-cssnext')]
