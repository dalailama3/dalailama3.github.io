var Board = require("./snake.js");

var SnakeView = window.SnakeView = function SnakeView ($el) {
  this.$el = $el;
  this.board = new Board();

  this.render();

  var board = this.board;

  $(window).on("keydown", function (event) {
    SnakeView.prototype.handleKeyEvent(event, board);
  });

  window.setInterval(this.step.bind(this), 200);


};



SnakeView.prototype.handleKeyEvent = function(event, board) {

    var code = event.keyCode;
    var dir;
    switch (code) {
      case 38:
        dir = "N";
        break;
      case 40:
        dir = "S";
        break;
      case 37:
        dir = "W";
        break;
      case 39:
        dir = "E";
        break;
    }
    console.log(dir);

    board.snake.turn(dir);
};

SnakeView.prototype.step = function() {
    this.board.snake.move();
    this.board.renderSnake();
    this.render();
};




SnakeView.prototype.render = function() {
  this.$el.empty();
  var len = this.board.grid.length;
  var $ul = $("<ul>");
  $ul.addClass("group");

  var renderGrid = this.board.renderSnake();

  for (var rowIdx = 0; rowIdx < len; rowIdx++) {
    for (var colIdx = 0; colIdx < len; colIdx++) {
      var $li = $("<li>");
      if (renderGrid[rowIdx][colIdx] === "x") {
        $li.addClass("snake-segment");
      }
      $ul.append($li);
    }
  }
  this.$el.append($ul);

}


module.exports = SnakeView;
