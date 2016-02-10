

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

  if (head === apple) {
    this.apple = this.randomApple();
    var newSegment = addSegment(this.snake.direction, tail);
    this.snake.segments.push(newSegment);
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
