

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

  if (this.direction === "N") {
    this.head = moveNorth(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }
  
  if (this.direction === "E") {
    this.head = moveEast(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }

  if (this.direction === "S") {
    this.head = moveSouth(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }

  if (this.direction === "W") {
    this.head = moveWest(this.head);
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
