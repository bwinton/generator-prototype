module.exports = function(grunt){

  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
  });

  grunt.loadNpmTasks('grunt-ssh');

  var commands = [
    ['cfx', 'xpi',
      '--update-link', 'https://people.mozilla.com/~bwinton/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.xpi',
      '--update-url', 'https://people.mozilla.com/~bwinton/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.update.rdf'],
    [v, 'copyFile', 'whimsy.xpi', '/Volumes/people.mozilla.com/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.xpi'],
    [v, 'copyFile', 'whimsy.update.rdf', '/Volumes/people.mozilla.com/public_html/<%= _.slugify(appname) %>/<%= _.slugify(appname) %>.update.rdf']
  ];
};