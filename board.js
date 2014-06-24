module.exports = Board;

var Type = {
  Bird: '@',
  Pipe: '#',
  Empty: '.'
};

var colsToMove = 2;

function Board() {
  this.init();
}

Board.prototype.init = function () {
  var i, j;

  this.board = [];
  this.length = 20;

  for (i = 0; i < this.length; i++) {
    this.board.push([]);
    
    for (j = 0; j < this.length; j++) {
      this.board[i].push('.');
    }
  }
};

Board.prototype.update = function () {
  var i, j, col;

  for (i = 0; i < this.length; i++) {
    for(j = 0; j < this.length - colsToMove; j++) {
      this.board[i][j] = this.board[i][j + 1];
    }
  }

  this._updateCol(this.length - colsToMove, Type.Pipe === this.board[0][j - 1] ? Type.Empty : createCol(this.length));
  this._updateCol(this.length - 1, Type.Empty);
  this.render();
}; 

Board.prototype._updateCol = function (j, type) {
  var isArray = type instanceof Array;

  for(var i = 0; i < this.length; i++) {
    this.board[i][j] = isArray ? type.shift() : type;
  }
};

Board.prototype.render = function () {
  var i;

  for (i = 0; i < this.length; i++) {
    console.log.apply(console, this.board[i]);
  }

  console.log('');
};

function createCol(len) {
  var i, type, result = [], rand = new Date().getMilliseconds() % 3;

  if (rand === 0) {
    type = Type.Empty;
  } else {
    type = Type.Pipe;
  }

  rand = Math.floor((Math.random() * (len - 2)) + 2);

  for (i = 0; i < len; i++) {
    if (i < rand) {
      result.push(type);
    } else {
      result.push(Type.Empty);
    }
  }

  return result;
}