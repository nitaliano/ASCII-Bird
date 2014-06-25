var Type = require('./type');
var State = require('./state');
var Player = require('./player');

module.exports = Board;

function Board() {
  this.board = [];
  this.length = 20;
  this.updateCount = 0;

  this.pipeMax = this.length - 2;
  this.pipeMin = 2;

  this.col1Index = this.length - 3;
  this.col2Index = this.length - 2;

  this.player = new Player(this.length);
  this.init();
}

Board.prototype.init = function () {
  var i, j;

  for (i = 0; i < this.length; i++) {
    this.board.push([]);
    
    for (j = 0; j < this.length; j++) {
      this.board[i].push(Type.Empty);
    }
  }

  this.board[this.player.x][this.player.y] = this.player.type;
};

Board.prototype.update = function (state) {
  var isPrevsPipe, lastRow, curCol;

  this._shift(state);

  curCol = this.col1Index - 1;
  lastRow = this.length - 1;

  isPrevsPipe = this._colHasPipe(0, curCol) 
    || this._colHasPipe(lastRow, curCol) 
    || this._colHasPipe(0, curCol - 1)
    || this._colHasPipe(lastRow, curCol - 1)
    || this._colHasPipe(0, curCol - 2)
    || this._colHasPipe(lastRow, curCol - 2);

  this._updateCol(this.col1Index, isPrevsPipe ? Type.Empty : this._createCol());
  this._updateCol(this.col2Index, Type.Empty);
  this.render();
  return this.board[this.player.x][this.player.y] === Type.Pipe;
}; 

Board.prototype._colHasPipe = function (i, j) {
  return Type.Pipe === this.board[i][j];
};

Board.prototype._shift = function (state) {
  var i, j;

  for (i = 0; i < this.length; i++) {
    for(j = 0; j < this.col1Index; j++) {
      this.board[i][j] = this.board[i][j + 1];

      if (this.board[i][j] === this.player.type) {
        this.board[i][j] = Type.Empty;
      }
    }
  }

  if (state === State.Down) {
    if (this.player.x + 2 < this.length) {
      this.player.x += 2;
    }
  } else {
    if (this.player.x - 2 >= 0) {
      this.player.x -= 2;
    }
  }

  this.board[this.player.x][this.player.y] = this.player.type;
};

Board.prototype._updateCol = function (j, type) {
  var isTopOrBottom, isArray = type instanceof Array;

  if (isArray) {
    this.updateCount++;
    isTopOrBottom = this.updateCount % 2 === 0;
  }

  for(var i = 0; i < this.length; i++) {
    this.board[i][j] = isArray ? (isTopOrBottom ? type.shift() : type.pop()) : type;
  }
};

Board.prototype.render = function () {
  var i;

  for (i = 0; i < this.length; i++) {
    console.log.apply(console, this.board[i]);
  }

  console.log('');
};

Board.prototype._createCol = function () {
  var i, type, result = [], rand;

  if (new Date().getMilliseconds() % 3 === 0) {
    type = Type.Empty;
  } else {
    type = Type.Pipe;
  }

  rand = Math.floor((Math.random() * this.pipeMax) + this.pipeMin);

  for (i = 0; i < this.length; i++) {
    if (i < rand) {
      result.push(type);
    } else {
      result.push(Type.Empty);
    }
  }

  return result;
};