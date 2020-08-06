const { Client, Collection } = require("discord.js");
const config = require("../config");
const PositionManager = require("./internals/managers/PositionManager");
const TimeManager = require("./internals/managers/TimeManager");
const TextManager = require("./internals/managers/TextManager");

const client = new Client();
client.commands = new Collection();
client.data = config;
client.positions = new PositionManager();
client.times = new TimeManager();
client.generateID = (from, to) => (Math.floor(Math.random() * (to - from) + from)).toString();
client.texts = new TextManager(config.smsacc_id, config.smsacc_token, config.smsacc_numbers.split(", "), client.generateID);

const mongoose = require("mongoose");
mongoose.connect(config.db_uri, { useNewUrlParser: true, useUnifiedTopology: true });

mongoose.connection.once("connected", () => {
	client.on("ready", async () => {
		try {
			await require("./internals/load/loadEvents")(client);
			await require("./internals/load/loadCommands")(client);
			require("log-timestamp");
			console.log(`Bot has been lsogged in as ${client.user.tag}.\n\nInvite Link: https://discord.com/oauth2/authorize?client_id=${client.user.id}&permissions=301279382&scope=bot`);
		} catch (e) {
			console.log(`An error occured on starting up, process terminated. ${e}`);
			process.exit();
		}
	});
});

client.login(config.token);