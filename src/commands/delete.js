module.exports = {
	"name": "delete",
	"description": "delete a position",
	"usage": "<id>",
	"execute": async(message, [id]) => {
		if (!message.client.positions.has(id)) return message.channel.send("That position does not exist.");
		const event = message.client.positions.get(id);
		let fetch_msg = await message.guild.channels.cache.get(message.client.channel_id).messages.fetch(event.msg_id);
		fetch_msg.delete();
		message.client.positions.delete(id);
		return message.channel.send("Event has been deleted");
	}
};