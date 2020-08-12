const { MessageEmbed } = require("discord.js");
const ErrorEmbed = require("../../internals/models/ErrorEmbed");
const PromptEmbed = require("../../internals/models/PromptEmbed");

module.exports = {
	"name": "log",
	"description": "Log your hours",
	"usage": "<hours> <firstname> <lastname> <description>",
	"example": "2.5 i taught them how to tie their shoes",
	"execute": async function (message) {
		if (message.channel.type !== "dm")
			message.channel.send("Please check your dms from me.");

		let dmChannel = await message.author.createDM();
		await message.author.send(new PromptEmbed("What is your first and last name?", "Please use the same name in every time log"));
		let name = (await message.client.prompter(dmChannel, message.author));
		if (!name) return message.author.send(new ErrorEmbed("You ran out of time!", "You didn't provide a name in time. Please run the command again"));
		name = name ? name.content : name;

		await message.author.send(new PromptEmbed("What is the amount of hours you spent", "PLEASE GIVE ONLY THE AMOUNT OF HOURS IN NUMBER FORM. **YOU WILL PROVIDE MINUTES LATER**. Cannot be more than 4 at a time."));
		let hours = (await message.client.prompter(dmChannel, message.author));
		if (!hours) return message.author.send(new ErrorEmbed("You ran out of time!", "You didn't provide an amount of hours in time. Please run the command again"));
		hours = hours ? hours.content : hours;
		if (parseInt(hours) > 4) return message.author.send(new ErrorEmbed("Too large!", "You have entered too many hours. Please run the command again"));
		if (Number.isNaN(parseInt(hours))) return message.author.send(new ErrorEmbed("Incorrect!", "You didn't provide a proper amount of hours. Please run the command again"));

		await message.author.send(new PromptEmbed("What is the amount of minutes you spent", "\nExample: `25`"));
		let minutes = (await message.client.prompter(dmChannel, message.author));
		if (!minutes) return message.author.send(new ErrorEmbed("You ran out of time!", "You didn't provide an amount of minutes in time. Please run the command again"));
		minutes = minutes ? minutes.content : minutes;
		if (parseInt(minutes) > 59) return message.author.send(new ErrorEmbed("Too large!", "You have entered too many minutes, please try again and correct."));
		if (Number.isNaN(parseInt(minutes))) return message.author.send(new ErrorEmbed("Incorrect!", "You didn't provide a proper amount of minutes. Please run the command again"));

		await message.author.send(new PromptEmbed("What date was this done?", "Please format as **MM-DD-YYYY**.\n`(Ex. 4-17-2020)`"));
		let date = (await message.client.prompter(dmChannel, message.author));
		if (!date) return message.author.send(new ErrorEmbed("You ran out of time!", "You didn't provide a date in time. Please run the command again"));
		date = date ? date.content : date;
		if (Number.isNaN(Date.parse(date))) return message.author.send(new ErrorEmbed("Incorrect!", "You didn't provide a valid date (Ex. 4-17-2020). Please run the command again"));
		if(Date.parse(date) < Date.parse("7-24-2020")) return message.author.send("Date is incorrect, can't be before 7-24-2020. Please try again.")

		await message.author.send(new PromptEmbed("What did you spend your time doing/teaching?", "This can be as long as you wish.\nEx. `Taught child how to tie their shoes`"));
		let description = (await message.client.prompter(dmChannel, message.author));
		if (!description) return message.author.send(new ErrorEmbed("You ran out of time!", "You didn't provide a description in time. Please run the command again"));
		description = description ? description.content : description;

		if (!hours || !minutes || !name || !date || !description) return message.author.send("An error occured, please try again");
		let id = message.client.generateID(1000, 10000);
		let timeEmbed = new MessageEmbed()
			.setTitle("New Volunteer Time")
			.setDescription(description)
			.addFields([
				{
					"name": "Amount of Time",
					"value": `${hours} hours and ${minutes} minutes`
				},
				{
					"name": "Date",
					"value": date
				},
				{
					"name": "Tutor",
					"value": name
				},
				{
					"name": "Submitter",
					"value": message.author.tag
				}
			])
			.setFooter(`ID: ${id}. To verify, do !times verify ${id}`);
		try {
			let msg = await message.client.channels.cache.get(message.client.data.times_id).send(timeEmbed);
			message.client.times.create(id,
				{
					"name": name,
					"description": description,
					"time": {
						"hours": hours,
						"minutes": minutes
					},
					"date": date,
					"msg_id": msg.id,
					"submitter": message.author.id
				});
		} catch(e) {
			return message.channel.send("Issue Saving time to Database. Contact Zaid.");
		}
		message.author.send(`Your time log has been recieved and will be reviewed before being inputted. Please screenshot the details below for your records.\n\nid: ${id}\nname: ${name}\ntime: ${hours} hours and ${minutes} minutes`);
	}
};
