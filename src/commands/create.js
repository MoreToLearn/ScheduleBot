const { MessageEmbed } = require("discord.js");

const fs = require("fs");

module.exports = {
	"name": "create",
	"description": "Create a position",
	"usage": "<name> <email> <phone> <description>",
	"execute": async (message, [email, ...description]) => {
		if (!email || !description) return message.channel.send(`You have not provided any details! Usage: \`${message.client.prefix}schedule <email> <description>\`.\nExample: \`${message.client.prefix}schedule me@email.com 5th Grader, wishing to learn geography\``);
		description = description.join(" ");
		const id = randomInRange(100, 1000);
		let msg = await message.guild.channels.cache.get(message.client.channel_id).send(new MessageEmbed().setTitle("New Tutor Request").setDescription(`**Description**: ${description}`).setFooter(`To claim, do ${message.client.prefix}claim ${id}`));
		const position = {
			"email": email,
			"description": description,
			"id": id,
			"message_id": msg.id
		};
		message.channel.send(`Event created in: ${msg.channel}`)
		return fs.writeFileSync(`${message.client.path}/${id}.json`, JSON.stringify(position));
	}
};

function randomInRange(from, to) {
	let r = Math.random();
	return Math.floor(r * (to - from) + from);
}