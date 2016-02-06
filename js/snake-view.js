var Board = require("./snake.js");

var SnakeView = function SnakeView ($el) {
  this.$el = $el;
  this.board = new Board();

  $(.snake).on("keydown", function(event) {
    handleKeyEvent(event);
  });

  function handleKeyEvent(event) {
    var dir = event.keyCode;
    this.board.snake.turn(dir);
  }
};
