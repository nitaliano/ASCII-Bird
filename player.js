var Type = require('./type');

module.exports = Player;

function Player(length) {
	this.y = 2;
	this.x = Math.floor(length / 2);
	this.type = Type.Bird;
}