module.exports = {
	"name": "delete",
	"description": "delete a position",
	"usage": "<id>",
	"example": "972",
	"execute": async(message, [id]) => {
		const event = await message.client.positions.get(id);
		if(!event) return message.channel.send("That position does not exist.");
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.channel_id).messages.fetch(event.msg_id);
		fetch_msg.delete();
		message.client.positions.delete(id);
		return message.channel.send("Event has been deleted");
	}
};