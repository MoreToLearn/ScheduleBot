const Manager = require("./Manager");

class PositionManager extends Manager {
	constructor() {
		super("positions", "position");
	}
}

module.exports = PositionManager;