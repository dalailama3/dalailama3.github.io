var Board = require("./snake.js");

var SnakeView = window.SnakeView = function SnakeView ($el) {
  this.$el = $el;
  this.board = new Board();

  this.render();

  var board = this.board;

  $(window).on("keydown", function (event) {
    SnakeView.prototype.handleKeyEvent(event, board);
  });

  this.loadSnake = window.setInterval(this.step.bind(this), 100);


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

    board.snake.turn(dir);
};

SnakeView.prototype.step = function() {
    this.board.snake.move();

    if (this.board.snake.gameOver) {
      clearInterval(this.loadSnake);
      var div = $("<div>");
      div.addClass("game-over");
      this.$el.parent().append(div);
      $("div.game-over").on("click", function (){
        location.reload();
      });
      return;


    }
    this.render();
};

function arrayInArray(needle, haystack) {
    var i=0, len = haystack.length, target = JSON.stringify(needle);
    for(; i < len; i++) {
        if (JSON.stringify(haystack[i]) == target) {
            return 1;
        }
    }
    return -1;
};

SnakeView.prototype.render = function() {
  this.$el.empty();
  var len = this.board.grid.length;
  var newGrid = this.board.grid;
  var segments = this.board.snake.segments;

  //search entire grid, if position is in segments array then add "snake-segment" class
  //
  var $ul = $("<ul>");
  $ul.addClass("group");

  for (var row = 0; row < len; row++) {
    for (var col = 0; col < len; col++) {
      var pos = [row, col];
      var $li = $("<li>");

      if (arrayInArray(pos, segments) === 1) {
        $li.addClass("snake-segment");
      }
      $ul.append($li);
    }
    this.$el.append($ul);
  }
};





// SnakeView.prototype.render = function() {
//   this.$el.empty();
//   var len = this.board.grid.length;
//   var $ul = $("<ul>");
//   $ul.addClass("group");
//
//   var renderGrid = this.board.renderSnake();
//
//
//   for (var rowIdx = 0; rowIdx < len; rowIdx++) {
//     for (var colIdx = 0; colIdx < len; colIdx++) {
//       var $li = $("<li>");
//       if (renderGrid[rowIdx][colIdx] === "x") {
//         $li.addClass("snake-segment");
//       }
//       $ul.append($li);
//     }
//   }
//   this.$el.append($ul);
//
// }


module.exports = SnakeView;
