var readline = require('readline');

module.exports = IOHandler;

function IOHandler() {
  this.rl = null;
  this.state = -1;
  this.kill = 5;
  this.waiting = -1;
}

IOHandler.prototype.getInput = function (cb) {
	var self = this;

	console.log('');

	this.rl = readline.createInterface({
    	input: process.stdin,
    	output: process.stdout
  	});

	this.rl.question('Enter 0-4 to move or 5 to quit - ', function (state) {
		if (state < 0 || state > 5) {
			self.state = self.kill;
			return;
		}
		self.state = +state;
		self.rl.close();
		console.log('');
		cb();
	});
};