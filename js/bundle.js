/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/js/";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	var View = __webpack_require__(1);
	
	$(function () {
	  var containerEl = $('.snake');
	  new View(containerEl);
	});


/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	var Board = __webpack_require__(2);
	
	var SnakeView = window.SnakeView = function SnakeView ($el) {
	  this.$el = $el;
	  this.board = new Board();
	
	  this.render();
	
	  var board = this.board;
	
	  $(window).on("keydown", function (event) {
	    SnakeView.prototype.handleKeyEvent(event, board);
	  });
	
	  this.loadSnake = window.setInterval(this.step.bind(this), 200);
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
	      var updatedScore = $(".score").text();
	      $("h1").text("Your Score: " + updatedScore);
	
	      // if (updatedScore > this.highScore) {
	      //   this.highScore = updatedScore;
	      //   $("h2").text("High Score: " + this.highScore);
	      // }
	      //leader board
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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	
	var Snake = function Snake(segments, direction) {
	  this.direction = direction;
	  this.segments = segments;
	  this.head = this.segments[0];
	  this.gameOver = false;
	
	};
	
	var GRIDLENGTH = 25;
	
	
	var moveNorth = function (pos) {
	  var newPos = [(pos[0] - 1), pos[1]];
	  return newPos;
	};
	
	var moveSouth = function (pos) {
	  var newPos = [(pos[0] + 1), pos[1]];
	  return newPos;
	};
	
	var moveEast = function (pos) {
	  var newPos = [pos[0], (pos[1] + 1)];
	  return newPos;
	};
	
	var moveWest = function (pos) {
	  var newPos = [pos[0], (pos[1] - 1)];
	  return newPos;
	};
	
	
	var outOfRange = function(pos) {
	  var x = pos[0];
	  var y = pos[1];
	
	  if ((x < 0 || x > GRIDLENGTH -1) || (y < 0 || y > GRIDLENGTH -1)) {
	    return true;
	  }
	};
	
	
	Snake.prototype.move = function () {
	
	
	  if (this.direction === "N") {
	    this.head = moveNorth(this.head);
	    var body = this.segments.slice(1);
	    if (outOfRange(this.head) || arrayInArray(this.head, body) === 1) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "E") {
	    this.head = moveEast(this.head);
	    var body = this.segments.slice(1);
	    if (outOfRange(this.head) || arrayInArray(this.head, body) === 1) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "S") {
	    this.head = moveSouth(this.head);
	    var body = this.segments.slice(1);
	    if (outOfRange(this.head) || arrayInArray(this.head, body) === 1) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "W") {
	    this.head = moveWest(this.head);
	    var body = this.segments.slice(1);
	    if (outOfRange(this.head) || arrayInArray(this.head, body) === 1) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	};
	
	var oppositeDir = function(dir1, dir2) {
	  if (dir1 === "N" && dir2 === "S") {
	    return true;
	  }
	  else if (dir1 === "S" && dir2 === "N") {
	    return true;
	  }
	  else if (dir1 === "E" && dir2 === "W") {
	    return true;
	  }
	  else if (dir1 === "W" && dir2 === "E") {
	    return true;
	  }
	  else {
	    return false;
	  }
	
	};
	
	// only change direction if not opposite of current direction
	Snake.prototype.turn = function (newDir) {
	
	  if (newDir === undefined) {
	    this.direction = this.direction;
	  }
	  else if (!oppositeDir(this.direction, newDir)) {
	    this.direction = newDir;
	  }
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
	
	var Board = function Board () {
	  this.grid = this.makeGrid();
	  this.snake = new Snake([[0,0], [0,1], [0,2], [0,3], [0,4]], "S");
	  this.snakeTwo = new Snake([[15,4], [15,3], [15,2], [15,1], [15,0]], "E");
	  this.apple = this.randomApple();
	};
	
	Board.prototype.randomApple = function () {
	  var x = Math.floor(Math.random() * GRIDLENGTH);
	  var y = Math.floor(Math.random() * GRIDLENGTH);
	  var pos = [x, y];
	
	  while (arrayInArray(pos, this.snake.segments) === 1) {
	    x = Math.floor(Math.random() * GRIDLENGTH);
	    y = Math.floor(Math.random() * GRIDLENGTH);
	    pos = [x, y];
	  }
	  return pos;
	};
	
	//add segment to position in opposite direction of snake's current direction
	//if illegal than move clockwise until legal
	var addSegment = function(direction, tailEnd) {
	  var result;
	  switch (direction) {
	    case "N":
	      if (!outOfRange(moveSouth(tailEnd))) {
	        result = moveSouth(tailEnd);
	      } else {
	        result = moveEast(tailEnd);
	      }
	      break;
	    case "S":
	      if (!outOfRange(moveNorth(tailEnd))) {
	        result = moveNorth(tailEnd);
	      } else {
	        result = moveWest(tailEnd);
	      }
	    case "E":
	      if (!outOfRange(moveWest(tailEnd))) {
	        result = moveWest(tailEnd);
	      } else {
	        result = moveNorth(tailEnd);
	      }
	    case "W":
	      if (!outOfRange(moveEast(tailEnd))) {
	        result = moveEast(tailEnd);
	      } else {
	        result = moveSouth(tailEnd);
	      }
	  }
	  return result;
	
	};
	
	Board.prototype.eatApple = function () {
	  var head = JSON.stringify(this.snake.head);
	  var apple = JSON.stringify(this.apple);
	  var segments = this.snake.segments;
	  var tail = segments[segments.length-1];
	
	  var headTwo = JSON.stringify(this.snakeTwo.head);
	  var segmentsTwo = this.snakeTwo.segments;
	  var tailTwo = segmentsTwo[segmentsTwo.length-1];
	
	  if (head === apple || headTwo === apple) {
	    this.apple = this.randomApple();
	
	    var newSegment = addSegment(this.snake.direction, tail);
	    this.snake.segments.push(newSegment);
	
	    var newSegmentTwo = addSegment(this.snakeTwo.direction, tailTwo);
	    this.snakeTwo.segments.push(newSegmentTwo);
	
	    return true;
	  }
	
	};
	
	
	Board.prototype.makeGrid = function() {
	  var grid = [];
	
	  for (var i = 0; i < GRIDLENGTH; i++) {
	    grid.push([]);
	    for (var j = 0; j < GRIDLENGTH; j++) {
	      grid[i].push(null);
	    }
	  }
	  return grid;
	
	};
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map