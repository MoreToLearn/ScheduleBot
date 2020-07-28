const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "claim",
	"description": "Claim an open position",
	"usage": "<claim-id>",
	"execute": async (message, [id]) => {
		if(!message.client.positions.has(id)) return message.channel.send("That position does not exist.");
		const event = message.client.positions.get(id);
		let fetch_msg = await message.guild.channels.cache.get(message.client.channel_id).messages.fetch(event.msg_id);
		fetch_msg.edit(`Claimed by ${message.author}`);
		message.client.positions.edit(id, {"taken": true, "claimer": message.author.id});
		message.delete();
		return message.author.send("Please contact the parent at your earliest convenience. Be professional, concise, and to the point. Take your time with the child, and make sure you review the info in our info channel. Best of luck! If you have any questions, contact a board member.", new MessageEmbed().setTitle("You have claimed a position.").setDescription("Note: please CC moretolearn20@gmail.com in all emails.").addField("Email To Contact", event.email).addField("Description of Position", event.description).setFooter("ID: 745"));
	}
};