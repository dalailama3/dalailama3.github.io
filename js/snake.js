

function Snake() {
  this.direction = ["N", "E", "S", "W"];
  this.segments = [[3,2], [3,3], [3,4], [3,5], [3,6]];
  this.head = this.segments[0];
  this.neck = this.segments[1];
}


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



Snake.prototype.move = function (dir) {


  if (dir === "N" && (this.neck !== moveNorth(this.head))) {
    this.head = moveNorth(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }
  if (dir === "E" && (this.neck !== moveEast(this.head))) {
    this.head = moveEast(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }
  if (dir === "S" && (this.neck !== moveSouth(this.head))) {
    this.head = moveSouth(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
  }
  if (dir === "W" && (this.neck !== moveWest(this.head))) {
    this.head = moveWest(this.head);
    this.segments.pop();
    this.segments = [this.head].concat(this.segments);
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



var test = new Board();

console.log(test);


test.snake.move("N");

test.renderSnake();
console.log(test);

test.snake.move("W");
test.renderSnake();

console.log(test);

test.snake.move("N");
test.renderSnake();

console.log(test);





module.exports = Board;
