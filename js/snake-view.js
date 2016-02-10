var Board = require("./snake.js");

var SnakeView = window.SnakeView = function SnakeView ($el) {
  this.$el = $el;
  this.board = new Board();

  this.render();

  var board = this.board;

  $(window).on("keydown", function (event) {
    SnakeView.prototype.handleKeyEvent(event, board);
  });

  this.loadSnake = window.setInterval(this.step.bind(this), 500);

};



SnakeView.prototype.handleKeyEvent = function(event, board) {

    var code = event.keyCode;
    var dir, dir2;
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
      case 65:
        dir2 = "W";
        break;
      case 87:
        dir2 = "N";
        break;
      case 68:
        dir2 = "E";
        break;
      case 83:
        dir2 = "S";
        break;
    }

    board.snake.turn(dir);
    board.snakeTwo.turn(dir2);
};

SnakeView.prototype.step = function() {
    this.board.snake.move();
    this.board.snakeTwo.move();
    if (this.board.eatApple()) {
        var score = $(".score").text();
        $("span.score").text(parseInt(score) + 10);
    }

    if (this.board.snake.gameOver || this.board.snakeTwo.gameOver) {
      clearInterval(this.loadSnake);
      var gameOverDiv = $(".game-over");
      gameOverDiv.removeClass("hide");
      $(".game-over button").on("click", function (){
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
  var segments = this.board.snake.segments;
  var head = JSON.stringify(segments[0]);
  var body = segments.slice(1,-1);
  var tail = JSON.stringify(segments[segments.length-1]);
  var apple = JSON.stringify(this.board.apple);

  var segmentsTwo = this.board.snakeTwo.segments;
  var headTwo = JSON.stringify(segmentsTwo[0]);
  var bodyTwo = segmentsTwo.slice(1,-1);
  var tailTwo = JSON.stringify(segmentsTwo[segmentsTwo.length-1]);


  //search entire grid, if position is in segments array then add "snake-segment" class
  //
  var $ul = $("<ul>");
  $ul.addClass("group");

  for (var row = 0; row < len; row++) {
    for (var col = 0; col < len; col++) {
      var pos = [row, col];
      var $li = $("<li>");

      if (JSON.stringify(pos) === head || JSON.stringify(pos) === headTwo) {
        $li.addClass("snake-head");
      }
      if (arrayInArray(pos, body.concat(bodyTwo)) === 1) {
        $li.addClass("snake-body");
      }
      if (JSON.stringify(pos) === tail || JSON.stringify(pos) === tailTwo) {
        $li.addClass("snake-tail");
      }

      if (JSON.stringify(pos) === apple) {
        $li.addClass("apple");

      }
      $ul.append($li);
    }
    this.$el.append($ul);
  }
};


module.exports = SnakeView;
