var Board = require('./board');
var IOHandler = require('./iohandler');
var State = require('./state');

module.exports = Game;

function Game() {
  this.io = new IOHandler();
  this.board = new Board();
  this.init();
};

Game.prototype.init = function () {
  this.board.render();
  this.heartbeat();
};

Game.prototype.heartbeat = function () {
  var self = this;

  if (this.io.state === State.Kill) {
    console.log('Thanks for playing');
    return;
  }

  this.io.getInput(function () {
    var isGameOver = self.board.update(self.io.state);

    if (isGameOver) {
      console.log('Game Over');
      return;
    }
    
    self.heartbeat();
  });
};

new Game();