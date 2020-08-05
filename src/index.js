const { Client, Collection } = require("discord.js");
const fs = require("fs");
const { token, channel_id, admin_id, email } = require("../config");
const PositionManager = require("./internals/managers/PositionManager");
const TimeManager = require("./internals/managers/TimeManager");

const client = new Client();
client.commands = new Collection();
client.path = `${__dirname}/../positions`;
client.prefix = "!";
client.channel_id = channel_id;
client.admin_id = admin_id;
client.email = email;
client.positions = new PositionManager();
client.times = new TimeManager();
client.generateID = (from, to) => (Math.floor(Math.random() * (to - from) + from)).toString();

client.on("ready", async () => {
	try {
		await require("./internals/load/loadEvents")(client);
		await require("./internals/load/loadCommands")(client);		if (!fs.existsSync("./positions")) await fs.promises.mkdir("./positions");
		if (!fs.existsSync("./data")) await fs.promises.mkdir("./data");
		if (!fs.existsSync("./data/positions")) await fs.promises.mkdir("./data/positions");
		if (!fs.existsSync("./data/times")) await fs.promises.mkdir("./data/times");
		require("log-timestamp");
		console.log(`Bot has been logged in as ${client.user.tag}.\n\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`);
	} catch (e) {
		console.log(`An error occured on starting up, process terminated. ${e}`);
		process.exit();
	}
});

client.login(token);