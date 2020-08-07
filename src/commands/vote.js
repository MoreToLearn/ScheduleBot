const { MessageEmbed } = require("discord.js");
const emojiRegex = require('emoji-regex');
const regex = emojiRegex();

module.exports = {
	"name": "vote",
	"description": "make a vote",
	"usage": "<description>",
	"execute": async (message, args) => {
		let description = args.join(" ");
		if (!description) return message.channel.send("You need to provide a description!");
		const regex = emojiRegex();
		let match;
		let emojis = [];
		// eslint-disable-next-line no-cond-assign
		while (match = regex.exec(message.content)) {
			const emoji = match[0];
			emojis.push(emoji);
		}

		let voteEmbed = new MessageEmbed()
			.setAuthor(message.author.tag, message.author.displayAvatarURL())
			.setTitle("Vote Started")
			.setDescription(`Please react with either of the two reactions at the bottom\n\n**Description**:\n${description}`)
			.setFooter(message.client.user.username, message.client.user.displayAvatarURL());
		let msg = await message.channel.send(voteEmbed);
		if (emojis.length > 1) {
			for (let emoji of emojis) {
				await msg.react(emoji);
			}
		} else {
			await msg.react("👍");
			await msg.react("👎");
		}
		message.delete();
	}
};