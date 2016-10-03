module.exports =

  files:
    javascripts: joinTo:
      'lib.js': /^(?!app)/
      'app.js': /^app/
      'test.js': /^app\/test/
    stylesheets: joinTo:
      'lib.css': /^(?!app)/
      'app.css': /^app/
    templates: joinTo: 'app.js'

  watcher:
    awaitWriteFinish: true
    usePolling: true

  plugins:
    babel:
      presets: ['latest', 'react']
    postcss:
      processors: [require('postcss-cssnext')]
