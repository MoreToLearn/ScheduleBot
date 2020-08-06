module.exports = {
	"name": "verify",
	"description": "verify an open time",
	"usage": "<log-id>",
	"example": "279",
	"execute": async (message, [id]) => {
		const log = await message.client.times.get(id);
		if(!log) return message.channel.send("That Log does not exist.");
		if(log.verified) return message.channel.send(`This time has already been verified by ${(await message.client.users.fetch(log.verifier)).tag}`)
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.admin_id).messages.fetch(log.msg_id);
		fetch_msg.edit(`Verified by ${message.author}`);
		log.verified = true;
		log.verifier = message.author.id;
		await log.save();
		message.delete();
		return message.channel.send("Time verified.");
	}
};