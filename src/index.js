const { Client, Collection } = require("discord.js");
const client = new Client();
const fs = require("fs");

const { token, channel_id } = require("../config");
client.commands = new Collection();
client.path = `${__dirname}/../positions`;
client.prefix = "!";
client.channel_id = channel_id;

client.on("ready", async () => {
	try {
		console.log(client.path);
		await require("./internals/load/loadEvents")(client);
		await require("./internals/load/loadCommands")(client);
		if (!fs.existsSync("./positions")) await fs.promises.mkdir("./positions");
		require("log-timestamp");
		console.log(`Bot has been logged in as ${client.user.tag}.\n\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`);
	} catch (e) {
		console.log(`An error occured on starting up, process terminated. ${e}`);
		process.exit();
	}
});

client.login(token);