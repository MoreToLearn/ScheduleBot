const MultiCommand = require("../internals/models/MultiCommand");

class texts extends MultiCommand {
    constructor() {
        super({
            "name": "texts",
            "description": "Perform an action involving texting",
            "sub_commands": ["text", "get", "chat-log"]
        });
    }
}

module.exports = new texts();