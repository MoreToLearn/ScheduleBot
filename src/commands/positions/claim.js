const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "claim",
	"usage": "<claim-id>",
	"example": "972",
	"description": "Claim a position",
	"guildOnly": true,
	"execute": async (message, [id]) => {
		if(!id) return message.channel.send("Must provide an id");
		const event = await message.client.positions.get(id);
		if(!event) return message.channel.send("That position does not exist.");
		if(event.taken) return message.channel.send("This position is already claimed.");
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.channel_id).messages.fetch(event.msg_id);
		fetch_msg.edit(`Claimed by ${message.author}`);
		event.taken = true;
		event.claimer = message.author.id;
		event.save();
		message.delete();
		await message.member.roles.add(message.client.data.claimer_role);
		return message.author.send("Please contact the parent at your earliest convenience. Be professional, concise, and to the point. Take your time with the child, and make sure you review the info in our info channel. Best of luck! If you have any questions, contact a board member.", new MessageEmbed().setTitle("You have claimed a position.").setDescription(`Note: please CC ${message.client.data.email} in all emails.`).addField("Email To Contact", event.email).addField("Description of Position", event.description).setFooter(`ID: ${event.id}`));
	}
};