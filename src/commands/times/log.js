const { MessageEmbed } = require("discord.js");

module.exports = {
	"name": "log",
	"description": "Log your hours",
	"usage": "<hours> <firstname> <lastname> <description>",
	"example": "2.5 i taught them how to tie their shoes",
	"execute": async function (message, [hour, firstname, lastname, ...description]) {
		if (!hour || !firstname || !lastname || !description) return message.channel.send(`You must provide a number of hours and description. Example: \`${message.client.prefix}times ${this.name} 2.5 Zaid Arshad taught them how to tie shoe\``);
		description = description.join(" ");
		const name = `${firstname} ${lastname}`;
		let id = message.client.generateID(0, 1000);
		let timeEmbed = new MessageEmbed()
			.setTitle("New Volunteer Time")
			.setDescription(description)
			.addFields([
				{
					"name": "Amount of Time",
					"value": `${hour} hours`
				},
				{
					"name": "Tutor",
					"value": name
				}
            ])
            .setFooter(`ID: ${id}. To verify, do !verify ${id}`);
        
        let msg = await message.client.channels.cache.get(message.client.admin_id).send(timeEmbed);
		message.client.times.create(id,
			{
				"name": name,
				"description": description,
				"time": hour,
				"msg_id": msg.id
            });
        message.channel.send(`Your time log has been recieved and will be reviewed before being inputted. Please screenshot the details below for your records.\n\nid: ${id}\nname: ${name}\ntime: ${hour} hours`);
	}
};
