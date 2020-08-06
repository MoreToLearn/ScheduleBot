const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "create",
	"description": "Create a position",
	"usage": "<email> <description>",
	"example": "testemail@yahoo.com Wants to learn how to tie their shoe",
	"execute": async function (message, [email, ...description]) {
		if (!email || !(description.length > 0)) return message.channel.send(`You have not provided any details! Usage: \`${message.client.data.prefix}${this.name} <email> <description>\`.\nExample: \`${message.client.data.prefix}${this.name} me@email.com 5th Grader, wishing to learn geography\``);
		description = description.join(" ");

		const id = message.client.generateID(1000, 10000);
		let msg = await message.guild.channels.cache.get(message.client.data.channel_id).send(new MessageEmbed().setTitle("New Tutor Request").addField("Description", description).setFooter(`To claim, do ${message.client.data.prefix}position claim ${id}`));
		await message.client.positions.create(id, {"email": email, "description": description, "msg_id": msg.id});

		return message.channel.send(new MessageEmbed().setTitle("Event Created").setDescription(`Event created in: ${message.guild.channels.cache.get(message.client.data.channel_id)}`).addFields(
			{
				"name": "ID",
				"value": id,
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
