const fs = require("fs");
const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "claim",
	"description": "Claim an open position",
	"usage": "<claim-id>",
	"execute": async (message, [id]) => {
		if(!fs.existsSync(`${message.client.path}/${id}.json`)) return message.channel.send("That position does not exist.");
		const event = JSON.parse(fs.readFileSync(`${message.client.path}/${id}.json`));
		let fetch_msg = await message.guild.channels.cache.get(message.client.channel_id).messages.fetch(event.message_id);
		fetch_msg.edit(`Claimed by ${message.author}`);
		message.delete();
 		return message.author.send(new MessageEmbed().setTitle("You have claimed this position.").setDescription(`**Email to contact:** ${event.email}\n**Description:** ${event.description}\n Note: please CC moretolearn20@gmail.com in all emails.`));
	}
};