const {
	MessageEmbed
} = require("discord.js");

module.exports = {
	"name": "help",
	"usage": "<args1> <args2>",
	"execute": async (message, [cmd]) => {
		if (cmd) {
			let command = message.client.commands.get(cmd);
			if(!command) return message.channel.send("Sorry, but that command doesn't exist!");
			return message.channel.send(new MessageEmbed().setTitle(`Info for ${cmd}`).setDescription(`Information for this command: \nName: ${command.name}\nDescription: ${command.descrpition}\nUsage: ${command.usage}`));
		}
		return message.channel.send(new MessageEmbed().setTitle("Commands").setDescription(`List of commands: \n\`\`\`${message.client.commands.map(x => x.name).filter(x => x !== "help").join(", ")}\`\`\``));
	}
};