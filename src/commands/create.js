const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "create",
	"description": "Create a position",
	"usage": "<name> <email> <phone> <description>",
	"execute": async (message, [email, ...description]) => {
		if (!email || !(description.length > 0)) return message.channel.send(`You have not provided any details! Usage: \`${message.client.prefix}schedule <email> <description>\`.\nExample: \`${message.client.prefix}schedule me@email.com 5th Grader, wishing to learn geography\``);
		description = description.join(" ");

		const id = randomInRange(100, 1000);
		let msg = await message.guild.channels.cache.get(message.client.channel_id).send(new MessageEmbed().setTitle("New Tutor Request").addField("Description", description).setFooter(`To claim, do ${message.client.prefix}claim ${id}`));
		message.client.positions.create(id, {"email": email, "description": description, "msg_id": msg.id});

		return message.channel.send(new MessageEmbed().setTitle("Event Created").setDescription(`Event created in: ${message.guild.channels.cache.get(message.client.channel_id)}`).addFields(
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

let randomInRange = (from, to) => {
	let r = Math.random();
	return (Math.floor(r * (to - from) + from)).toString();
};