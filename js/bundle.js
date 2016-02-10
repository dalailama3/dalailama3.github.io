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
	    this.board.eatApple();
	
	    if (this.board.snake.gameOver) {
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
	
	
	  //search entire grid, if position is in segments array then add "snake-segment" class
	  //
	  var $ul = $("<ul>");
	  $ul.addClass("group");
	
	  for (var row = 0; row < len; row++) {
	    for (var col = 0; col < len; col++) {
	      var pos = [row, col];
	      var $li = $("<li>");
	
	      if (JSON.stringify(pos) === head) {
	        $li.addClass("snake-head");
	      }
	      if (arrayInArray(pos, body) === 1) {
	        $li.addClass("snake-body");
	      }
	      if (JSON.stringify(pos) === tail) {
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

	
	
	var Snake = function Snake() {
	  this.direction = "S";
	  this.segments = [[0,0], [0,1], [0,2], [0,3], [0,4]];
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
	    if (outOfRange(this.head)) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "E") {
	    this.head = moveEast(this.head);
	    if (outOfRange(this.head)) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "S") {
	    this.head = moveSouth(this.head);
	    if (outOfRange(this.head)) {this.gameOver = true;}
	    this.segments.pop();
	    this.segments = [this.head].concat(this.segments);
	  }
	
	  if (this.direction === "W") {
	    this.head = moveWest(this.head);
	    if (outOfRange(this.head)) {this.gameOver = true;}
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
	
	  if (oppositeDir(this.direction, newDir)) {
	    this.direction = this.direction;
	  } else {
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
	  this.snake = new Snake();
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
	
	Board.prototype.eatApple = function () {
	  var head = JSON.stringify(this.snake.head);
	  var apple = JSON.stringify(this.apple);
	  if (head === apple) {
	    this.apple = this.randomApple();
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