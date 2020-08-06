module.exports = {
    "name": "get",
    "usage": "<id>",
    "example": "3478",
    "description": "Get a specific text message",
    "execute": async (message, [id]) => {
        if(!id) return message.channel.send("You must provide an ID to a valid message sent through the bot");
        let text = await message.client.texts.get(id);
        if(!text) return message.channel.send("Sorry, but that text does not exist.");
        return message.channel.send(`Message Sent: \`${text.body}\`\nSender: \`${text.from} (${(await message.client.users.fetch(text.sender)).tag})\`\nSent To: \`${text.to}\``)
    }
};