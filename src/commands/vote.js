const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "vote",
	"description": "make a vote",
	"usage": "<description>",
	"execute": async(message, args) => {
		let description = args.join(" ");
		if(!description) return message.channel.send("You need to provide a description!");
		let voteEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setTitle("Vote Started")
			.setDescription(`Please react with either of the two reactions at the bottom\n\n**Description**:\n${description}`)
			.setFooter(message.client.user.username, message.client.user.displayAvatarURL());
		let msg = await message.channel.send(voteEmbed);
		await msg.react("??");
		await msg.react("??");
		message.delete();
	}
};