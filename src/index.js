const { Client, Collection } = require("discord.js");
const client = new Client();

const { token } = require("../config");
client.commands = new Collection();

client.on("ready", async () => {
	try {
		await require("./internals/load/loadEvents")(client);
		await require("./internals/load/loadCommands")(client);
		require("log-timestamp");
		console.log(`\n\nBot has been logged in as ${client.user.tag}.\n\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`);
	} catch (e) {
		console.log(`An error occured on starting up, process terminated. ${e}`);
		process.exit();
	}
});

client.login(token);