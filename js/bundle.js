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


/***/ },
/* 2 */
/***/ function(module, exports) {

	
	
	var Snake = function Snake() {
	  this.direction = "W";
	  this.segments = [[3,2], [3,3], [3,4], [3,5], [3,6]];
	  this.head = this.segments[0];
	
	};
	
	
	
	
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
	
	
	
	Snake.prototype.move = function () {
	
	  var currentSegments = this.segments;
	  var neck = JSON.stringify(currentSegments[1]);
	  var head = currentSegments[0];
	
	  if (this.direction === "N") {
	    if (neck !== JSON.stringify(moveNorth(head))) {
	      this.head = moveNorth(this.head);
	      this.segments.pop();
	      this.segments = [this.head].concat(this.segments);
	    }
	  }
	
	  if (this.direction === "E") {
	    if (neck !== JSON.stringify(moveEast(head))) {
	      this.head = moveEast(this.head);
	      this.segments.pop();
	      this.segments = [this.head].concat(this.segments);
	    }
	  }
	  if (this.direction === "S") {
	    if (neck !== JSON.stringify(moveSouth(head))) {
	      this.head = moveSouth(this.head);
	      this.segments.pop();
	      this.segments = [this.head].concat(this.segments);
	    }
	  }
	
	  if (this.direction === "W") {
	    if (neck !== JSON.stringify(moveWest(head))) {
	      this.head = moveWest(this.head);
	      this.segments.pop();
	      this.segments = [this.head].concat(this.segments);
	    }
	  }
	
	
	};
	
	Snake.prototype.turn = function (newDir) {
	  this.direction = newDir;
	
	};
	
	var Board = function Board () {
	  this.grid = this.makeGrid();
	  this.snake = new Snake();
	  this.renderSnake();
	};
	
	Board.prototype.makeGrid = function() {
	  var grid = [];
	  for (var i = 0; i < 8; i++) {
	    grid.push([]);
	    for (var j = 0; j < 8; j++) {
	      grid[i].push(null);
	    }
	  }
	  return grid;
	
	};
	
	function arrayInArray(needle, haystack) {
	    var i=0, len=haystack.length, target=JSON.stringify(needle);
	    for(; i<len; i++) {
	        if (JSON.stringify(haystack[i]) == target) {
	            return 1;
	        }
	    }
	    return -1;
	};
	
	Board.prototype.renderSnake = function() {
	  var newGrid = this.grid;
	  var segments = this.snake.segments;
	
	  //search entire grid, if position is in segments array then render it as "x"
	  //
	  for (var row = 0; row < newGrid.length; row++) {
	    for (var col = 0; col < newGrid.length; col++) {
	      var pos = [row, col];
	
	      if (arrayInArray(pos, segments) === 1) {
	        newGrid[row][col] = "x";
	
	      } else {
	        newGrid[row][col] = null;
	      }
	    }
	  }
	  return newGrid;
	
	};
	
	
	
	
	
	
	module.exports = Board;


/***/ }
/******/ ]);
//# sourceMappingURL=bundle.js.map