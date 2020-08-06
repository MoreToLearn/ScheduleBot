const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "say",
    "usage": "<message>",
    "example": "this is a test",
	"execute": async (message, [body]) => {
        message.delete();
        if(!body) return message.channel.send("You gotta say *something*");
        message.channel.send(
            new MessageEmbed()
                .setAuthor(message.author.tag, message.author.displayAvatarURL())
                .setDescription(body)
                .setFooter("MoreToLearn", message.client.user.displayAvatarURL())
        );
	}
};