const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "create",
	"description": "Create a position",
	"usage": "<email> <description>",
	"example": "testemail@yahoo.com Wants to learn how to tie their shoe",
	"execute": async function (message, [email, ...description]) {
		if (!email || !(description.length > 0)) return message.channel.send(`You have not provided any details! Usage: \`${message.client.prefix}${this.name} <email> <description>\`.\nExample: \`${message.client.prefix}${this.name} me@email.com 5th Grader, wishing to learn geography\``);
		description = description.join(" ");

		const id = message.client.generateID(0, 1000);
		let msg = await message.guild.channels.cache.get(message.client.channel_id).send(new MessageEmbed().setTitle("New Tutor Request").addField("Description", description).setFooter(`To claim, do ${message.client.prefix}position claim ${id}`));
		let created_position = message.client.positions.create(id, {"email": email, "description": description, "msg_id": msg.id});

		return message.channel.send(new MessageEmbed().setTitle("Event Created").setDescription(`Event created in: ${message.guild.channels.cache.get(message.client.channel_id)}`).addFields(
			{
				"name": "ID",
				"value": created_position.id,
				"inline": true
			},
			{
				"name": "Link",
				"value": `[here](${msg.url})`,
				"inline": true
			},
			{
				"name": "Created By",
				"value": message.author.tag
			}
		));
	}
};
