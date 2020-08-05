module.exports = {
	"description": "verify an open time",
	"usage": "<log-id>",
	"example": "279",
	"execute": async (message, [id]) => {
		if(!message.client.times.has(id)) return message.channel.send("That Log does not exist.");
		const log = message.client.times.get(id);
		let fetch_msg = await message.guild.channels.cache.get(message.client.admin_id).messages.fetch(log.msg_id);
		fetch_msg.edit(`Verified by ${message.author}`);
		message.client.positions.edit(id, {"verifier": message.author.tag});
		message.delete();
		return message.channel.send("Time verified.");
	}
};