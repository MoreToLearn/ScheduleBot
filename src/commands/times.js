const MultiCommand = require("../internals/models/MultiCommand");

class times extends MultiCommand {
    constructor() {
        super({
            "name": "times",
            "description": "Perform an action involving logging time",
            "sub_commands": ["log", "verify", "reject", "meeting"]
        });
    }
}
module.exports = new times();