const MultiCommand = require("../internals/models/MultiCommand");

class position extends MultiCommand {
    constructor() {
        super({
            "name": "position",
            "description": "Perform an action involving positions",
            "sub_commands": ["claim", "create", "delete"]
        });
    }
}

module.exports = new position();