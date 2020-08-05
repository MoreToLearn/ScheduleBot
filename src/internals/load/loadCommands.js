const {
	readdir
} = require("./fileInteraction");

module.exports = async (client) => {
	let commands = await readdir(`${__dirname}/../../commands`, { "withFileTypes": true});
	commands.forEach(file => {
		if(!file.name.endsWith(".js")) return;
		let command = require(`../../commands/${file.name}`);
		return client.commands.set(command.name, command);
	});
};