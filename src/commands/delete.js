const fs = require("fs");

module.exports = {
	"name": "delete",
	"description": "delete a position",
	"usage": "<id>",
	"execute": async(message, [id]) => {
		if(!fs.existsSync(`${message.client.path}/${id}.json`)) return message.channel.send("That event does not exist");
		const event = JSON.parse(fs.readFileSync(`${message.client.path}/${id}.json`));
		let fetch_msg = await message.guild.channels.cache.get(message.client.channel_id).messages.fetch(event.message_id);
		fetch_msg.delete();
		fs.unlinkSync(`${message.client.path}/${id}.json`);
		return message.channel.send("Event has been deleted");
	}
};