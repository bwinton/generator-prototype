module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadNpmTasks('grunt-ssh');

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
      var commands = [
        ['copyFile', '<%= _.slugify(appname) %>.xpi', '/Volumes/people.mozilla.com/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.xpi'],
        ['copyFile', '<%= _.slugify(appname) %>.update.rdf', '/Volumes/people.mozilla.com/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.update.rdf']
      ];
      done();
    });
  });
};
