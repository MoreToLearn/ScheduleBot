const { MessageEmbed } = require("discord.js");

module.exports = class extends MessageEmbed {
    constructor(name, description) {
        super();
        super.setColor("RED");
        super.setTitle(name);
        super.setDescription(description);
    }
};