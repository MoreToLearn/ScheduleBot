module.exports = {
	"name": "help",
	"usage": "<args1> <args2>",
	"args": 3,
	"execute": async (message, args) => {
		return message.channel.send("Test")
	}
}