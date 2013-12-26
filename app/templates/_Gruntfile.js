module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  /* Build and deploy tasks. */

  grunt.registerTask('build', 'Build the add-on', function() {
    var done = this.async();
    grunt.util.spawn({
      cmd: 'cfx',
      args: ['xpi',
        '--update-link',
        'https://people.mozilla.com/~bwinton/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.xpi',
        '--update-url',
        'https://people.mozilla.com/~bwinton/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.update.rdf'
      ]
    }, function spawned(error, result, code) {
      grunt.log.ok(result);
      grunt.log.ok('Add-on built.');
      done();
    });
  });

  grunt.registerTask('copy', 'Copy the files to the server.', function() {
    this.requires(['build']);

    if (!grunt.file.exists('/Volumes/People/public_html/<%= _.slugify(appname) %>')) {
      grunt.log.error('Missing Directory!');
      done(false);
      return;
    }

    grunt.file.copy('<%= _.slugify(appname) %>.xpi',
                    '/Volumes/People/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.xpi',
                    {"encoding": null});
    grunt.log.ok('Copied XPI…');
    grunt.file.copy('<%= _.slugify(appname) %>.update.rdf',
                    '/Volumes/People/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.update.rdf',
                    {"encoding": null});
    grunt.log.ok('Copied update.rdf…');
    grunt.file.copy('index.html',
                    '/Volumes/People/public_html/<%= _.slugify(appname) %>/index.html',
                    {"encoding": null});
    grunt.log.ok('Copied index.html…');
  });

  grunt.registerTask('deploy', 'Build the add-on and copy the files.', ['build', 'copy']);


  /* Testing tasks. */

  grunt.registerTask('run', 'Run a testing version of the add-on', function() {
    var done = this.async();
    var run = grunt.util.spawn({
      cmd: 'cfx',
      args: ['run',
        '-b',
        '<%= firefox %>',
        '-p',
        'profile.testing'
      ]
    }, function spawned(error, result, code) {
      done();
    });
    if (run.stderr) {
      run.stderr.on('data', function (buf) {
        grunt.log.ok(buf);
      })
    }
  });

  grunt.registerTask('test', 'Run the tests for the add-on', function() {
    var done = this.async();
    var run = grunt.util.spawn({
      cmd: 'cfx',
      args: ['test',
        '-b',
        '<%= firefox %>'
      ]
    }, function spawned(error, result, code) {
      done();
    });
    if (run.stderr) {
      run.stderr.on('data', function (buf) {
        grunt.log.ok(buf);
      })
    }
  });


};
