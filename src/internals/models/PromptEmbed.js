const { MessageEmbed } = require("discord.js");

module.exports = class extends MessageEmbed{
    constructor(prompter, description) {
        super();
        super.setColor("ORANGE");
        super.setTitle(prompter);
        super.setDescription(description);
    }
};