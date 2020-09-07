module.exports = {
	"name": "bump",
	"usage": "<claim-id>",
	"example": "972",
	"description": "Bump a position",
	"execute": async (message, [id]) => {
		if (!id) return message.channel.send("Need to provide an id");
		const event = await message.client.positions.get(id);
		if (!event) return message.channel.send("That position does not exist.");
		if (event.taken) return message.channel.send("This position is already claimed.");
		let fetch_msg = await message.guild.channels.cache.get(message.client.data.channel_id).messages.fetch(event.msg_id);
		if (!fetch_msg) return message.channel.send("I couldn't find that position!");
		fetch_msg.delete();
		const newm = await message.guild.channels.cache.get(message.client.data.channel_id).send("THIS POSITION IS BEING BUMPED. If you do not have a student, feel free to claim", fetch_msg.embeds[0]);
		event.msg_id = newm.id;
		await event.save();
		message.channel.send("Position has been bumped.");
	}
};