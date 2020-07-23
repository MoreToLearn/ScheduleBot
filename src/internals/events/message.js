module.exports = async (message) => {
	let prefix = message.client.prefix;
	//check to see if the message author is a bot
	if (!message.content.startsWith(prefix) || message.author.bot) return;

	//after slicing the prefix off the message, split it into an args string by each space
	const args = message.content.slice(prefix.length).split(/ +/);

	//remove and retrieve the first argument in args, which is the command name
	const commandName = args.shift().toLowerCase();

	//retrieve the command (by name) from the collection that is populated with the commands on startup
	const command = message.client.commands.get(commandName) || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
	//if the command is not in the collection, do not continue

	if (!command) return;

	//if the command has the property guildOnly as true, and the message isn't in a guild, do not continue
	if (command.guildOnly && message.channel.type !== "text") {
		return message.reply("Sorry, but you can't execute that command inside DMs!");
	}
	//if the command *has* a required permissions array, and the executor does not have these said permissions, do not continue
	if (command.permissions && !message.guild.member(message.author).hasPermission(command.permissions, false, true, true)) {
		return message.reply(`Sorry, but you do not have the permissions: ${command.permissions}. `);
	}

	if (command.mentions) {
		if ((command.mentions.required_mentions !== -1 && message.mentions.users.size !== command.mentions.required_mentions) || (message.mentions.users.size < 1)) {
			if (message.mentions.users.size > 5) return message.reply("Too many mentions!");
			let reply = "You gotta mention people for this command to work!";
			if (command.usage) {
				reply += `\nThe proper usage would be: \`${prefix}${command.name} ${command.usage}\``;
			}
			return message.reply(reply);
		}
		if (message.mentions.users.size > 5)
			return message.reply("Too many mentions!");
	}
	//if the command has the property args as true, and the amount of args are not equal to the required args length AND the required length isn't set to -1 (unlimited args, usually the command will have a regex that takes quote args)
	if(command.args && command.args > args.length) {
		return message.channel.send(`You have provided an incorrect number of args.${command.usage ? `\n Usage: \`${command.usage}\`` : ""}`);
	}
	//execute the command
	try {
		//wrap it in an async because most of the commands should return a promise that we would like to await.
		await command.execute(message, args);
	} catch (e) {
		console.log(e);
		message.channel.send("There was an error doing that. Weird, tell Zaid.");
	}
};