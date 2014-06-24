var Board = require('./board');
var IOHandler = require('./iohandler');

module.exports = Game;

function Game() {
  this.init();
};

Game.prototype.init = function () {
  var self = this;
  this.io = new IOHandler();
  this.board = new Board();
  this.board.render();
  heartbeat.call(this);

  function heartbeat() {
    if (this.io.state === this.io.kill) {
      console.log('Thanks for playing');
      return;
    }

    this.io.getInput(function () {
      self.board.update();
      heartbeat.call(self);
    });
  }
};

new Game();