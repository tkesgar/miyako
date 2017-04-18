module.exports =

  files:
    javascripts: joinTo:
      'lib.js': /^(?!app)/
      'app.js': /^app/
    stylesheets: joinTo:
      'lib.css': /^(?!app)/
      'app.css': /^app/
    templates: joinTo: 'app.js'

  npm:
    styles:
      bootstrap: ['dist/css/bootstrap.css']
    globals:
      jQuery: 'jquery'

  plugins:
    babel:
      presets: ['env']
    postcss:
      processors: [
        require('postcss-cssnext')
      ]
