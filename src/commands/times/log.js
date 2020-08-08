const { MessageEmbed } = require("discord.js");
const PromptEmbed = require("../../internals/models/PromptEmbed");
const ErrorEmbed = require("../../internals/models/ErrorEmbed");
const prompter = require("discordjs-prompter");

module.exports = {
	"name": "log",
	"description": "Log your hours",
	"usage": "<hours> <firstname> <lastname> <description>",
	"example": "2.5 i taught them how to tie their shoes",
	"execute": async function (message) {
		if(message.channel.type !== "dm") retunr message.channel.send("You can only do this in dms in order to protect your information.")
		let name = (await prompter.message(message.channel, {
			question: new PromptEmbed("What is your full name?", "Please give your full name"),
			userId: message.author.id,
			max: 1,
			timeout: 17000,
		})).first();
		if(!name) return message.channel.send(new ErrorEmbed("You ran out of time!", "You didn't provide a name in time"));
		
		let hours = (await prompter.message(message.channel, {
			question: new PromptEmbed("What is the amount of hours you spent", "PLEASE GIVE ONLY THE AMOUNT OF HOURS IN NUMBER FORM. **YOU WILL PROVIDE MINUTES LATER**.\nExample: `5`"),
			userId: message.author.id,
			max: 1,
			timeout: 17000,
		})).first();
		if(!hours) return message.channel.send(new ErrorEmbed("You ran out of time!", "You didn't provide an amount of hours in time"));
		if(parseInt(hours) > 4) return message.channel.send(new ErrorEmbed("Too large!", "You have entered too many hours, please correct."));
		if(Number.isNaN(parseInt(hours))) return message.channel.send(new ErrorEmbed("Incorrect!", "You didn't provide a proper amount of hour"));

		let minutes = (await prompter.message(message.channel, {
			question: new PromptEmbed("What is the amount of minutes you spent", "PLEASE GIVE ONLY THE AMOUNT OF MINUTES IN NUMBER FORM.\n`25`"),
			userId: message.author.id,
			max: 1,
			timeout: 17000,
		})).first();
		if(!minutes) return message.channel.send(new ErrorEmbed("You ran out of time!", "You didn't provide an amount of minutes in time"));
		if(parseInt(minutes) > 60) return message.channel.send(new ErrorEmbed("Sorr"))
		if(Number.isNaN(parseInt(minutes))) return message.channel.send(new ErrorEmbed("Incorrect!", "That is not a proper amount of minutes. Try running this again."));

		let date = (await prompter.message(message.channel, {
			question: new PromptEmbed("What date was this done?", "Please do **MM-DD-YYYY**.\n`(Ex. 4-17-2020)`"),
			userId: message.author.id,
			max: 1,
			timeout: 17000,
		})).first();
		if(!date) return message.channel.send(new ErrorEmbed("You ran out of time!", "You didn't provide a date in time"));
		if(Number.isNaN(Date.parse(date))) return message.channel.send(new ErrorEmbed("Incorrect!", "You didn't provide a valid date. Please try again, Ex. (4-17-2020). Run the command again"));
		
		let description = (await prompter.message(message.channel, {
			question: new PromptEmbed("What did you spend your time doing/teaching?", "This can be as long as you wish.\nEx. `Taught child how to tie their shoes`"),
			userId: message.author.id,
			max: 1,
			timeout: 17000,
		})).first();
		if(!description) return message.channel.send(new ErrorEmbed("You ran out of time!", "You didn't provide a description in time"));

		if (!hours || !minutes || !name || !date || !description) return message.channel.send("An error occured, please try again");
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
				}
			])
			.setFooter(`ID: ${id}. To verify, do !times verify ${id}`);

		let msg = await message.client.channels.cache.get(message.client.data.admin_id).send(timeEmbed);
		message.client.times.create(id,
			{
				"name": name,
				"description": description,
				"time": {
					"hours": hours,
					"minutes": minutes
				},
				"date": new Date(date),
				"msg_id": msg.id
			});
		message.channel.send(`Your time log has been recieved and will be reviewed before being inputted. Please screenshot the details below for your records.\n\nid: ${id}\nname: ${name}\ntime: ${hours} hours and ${minutes} minutes`);
	}
};
