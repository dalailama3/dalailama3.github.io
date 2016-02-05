var View = require('./snake-view');
var Game = require('./snake.js');

$(function () {
  var containerEl = $('');
  var game = new Game();
  new View(game, containerEl);
})
