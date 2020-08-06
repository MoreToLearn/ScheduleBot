module.exports = {
    "name": "chat-log",
    "usage": "<id|number>",
    "example": "3478",
    "description": "Get chat history from a specific id or number",
    "execute": async (message, [find]) => {
        find = message.mentions.users.first() ? message.mentions.users.first().id : find;
        if (!find) return message.channel.send("You must provide either an id, mention, or phone number to search for");
        let messages = (await message.client.texts.logs(find)).sort((a, b) => a.date - b.date);
        let list = messages.map(x => `[**${x.sender}**->**${x.to}**]: ${x.body}`);
        return message.channel.send(list.join("\n\n"));
    }
};