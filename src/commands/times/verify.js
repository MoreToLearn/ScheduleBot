const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "verify",
	"description": "verify an open time",
	"usage": "<log-id>",
	"example": "279",
	"execute": async (message, [id, ...more_info]) => {
		if(!message.member.roles.cache.some(x => x.name.toLowerCase() === "time verifier")) return message.channel.send("You do not have the `Time Verifier` role. Please contact the Board for more information.");
		const log = await message.client.times.get(id);
		if(!log) return message.channel.send("That Log does not exist.");
		if(log.verified) return message.channel.send(`This time has already been verified by ${(await message.client.users.fetch(log.verifier)).tag}`)
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.times_id).messages.fetch(log.msg_id);
		fetch_msg.edit(`Verified by ${message.author}. ${more_info.length > 0 ? `ADDITIONAL INFO: ${more_info.join(" ")}`: ""}`);
		log.verified = true;
		more_info.length > 0 ? log.additional_note = more_info.join(" ") : null;
		log.verifier = message.author.id;
		await log.save();
		let submitter = await message.client.users.fetch(log.submitter);
		if(submitter) submitter.send(new MessageEmbed().setColor("GREEN").setDescription(`Your time log with the id: ${log._id} with the time: ${log.time.hours} hours and ${log.time.minutes} minutes has been VERIFIED. Please screenshot this for your records`));
		return message.channel.send("Time verified.");
	}
};