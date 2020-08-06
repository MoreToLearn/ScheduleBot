const MultiCommand = require("../internals/models/MultiCommand");

class positions extends MultiCommand {
    constructor() {
        super({
            "name": "positions",
            "description": "Perform an action involving positions",
            "sub_commands": ["claim", "create", "delete"]
        });
    }
}

module.exports = new positions();