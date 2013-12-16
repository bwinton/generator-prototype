'use strict';
var util = require('util');
var path = require('path');
var yeoman = require('yeoman-generator');


var PrototypeGenerator = module.exports = function PrototypeGenerator(args, options, config) {
  yeoman.generators.Base.apply(this, arguments);

  this.on('end', function () {
    this.installDependencies({ skipInstall: options['skip-install'] });
  });

  this.pkg = JSON.parse(this.readFileAsString(path.join(__dirname, '../package.json')));
};

util.inherits(PrototypeGenerator, yeoman.generators.Base);

PrototypeGenerator.prototype.askFor = function askFor() {
  var cb = this.async();

  // have Yeoman greet the user.
  console.log(this.yeoman);

  var prompts = [{
    name: 'description',
    message: 'Please describe your add-on:'
  },{
    type: 'confirm',
    name: 'micropilot',
    message: 'Would you like to add Micropilot?',
    default: true
  }];

  this.prompt(prompts, function (props) {
    this.micropilot = props.micropilot;
    this.description = props.description;
    this.author = this.user.git.username + ' <' + this.user.git.email + '>';
    cb();
  }.bind(this));
};

PrototypeGenerator.prototype.app = function app() {
  this.mkdir('data');
  this.copy('icon-48.png', 'data/icon-48.png');
  this.copy('icon-64.png', 'data/icon-64.png');

  this.mkdir('lib');
  this.template('_main.js', 'lib/main.js');
  if (this.micropilot) {
    this.copy('micropilot.js', 'lib/micropilot.js');
  }

  this.mkdir('test');
  this.copy('test-main.js', 'test/test-main.js');

  this.template('_package.json', 'package.json');
};

PrototypeGenerator.prototype.projectfiles = function projectfiles() {
  this.copy('jshintrc', '.jshintrc');
  this.template('_Gruntfile.js', 'Gruntfile.js');
};
