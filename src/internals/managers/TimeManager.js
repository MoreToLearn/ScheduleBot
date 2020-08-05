const Manager = require("./Manager");

class TimeManager extends Manager{
	constructor() {
		super("times", "log");
	}
}

module.exports = TimeManager;