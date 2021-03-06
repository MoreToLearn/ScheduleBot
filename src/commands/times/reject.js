const { MessageEmbed } = require("discord.js");
module.exports = {
	"name": "reject",
	"description": "reject an open time",
	"usage": "<log-id>",
	"example": "279",
	"execute": async (message, [id, ...reason]) => {
		const log = await message.client.times.get(id);
		if(!log) return message.channel.send("That Log does not exist.");
		if(log.verified) return message.channel.send(`This time has already been verified by ${(await message.client.users.fetch(log.verifier)).tag}`)
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.times_id).messages.fetch(log.msg_id);
		fetch_msg.edit(`**REJECTED** by ${message.author}`);
        await message.client.times.delete(id);
		reason = reason.join(" ");
		let submitter = await message.client.users.fetch(log.submitter);
		if(submitter) submitter.send(new MessageEmbed().setColor("RED").setDescription(`Your time log with the id: ${log._id} with the time: ${log.time.hours} hours and ${log.time.minutes} minutes has been **REJECTED** ${reason? `because ${  reason}`: ""}. In most cases, you can just resubmit your log again, with the proper info. If you have any questions, contact a board member`));
		return message.channel.send("Time rejected.");
	}
};