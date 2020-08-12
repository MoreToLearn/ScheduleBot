const { MessageEmbed } = require("discord.js");

module.exports = {
    "name": "text",
    "usage": "<number> <message>",
    "example": "7166014482 this is a test",
    "description": "Text a person through the bot",
    "execute": async (message, [number, ...body]) => {
        if (message.channel.type !== "dm") {
            return message.channel.send("Hey, to protect your conversation, please do this in my dms. You can access my dms by clicking on my name and hitting message on mobile.")
        }
        body = body.join(" ");
        if (!number || !body) return message.channel.send("You need to supply a valid number and message to go along with it.");
        let text = await message.client.texts.send("7166048061", "this is a test", message.author.id);
        message.channel.send(
            new MessageEmbed()
                .setTitle("Message Sent")
                .setDescription(`You said: \`\`\`${body}\`\`\``)
                .setColor("GREEN")
                .setFooter(`ID: ${text._id}`)
        );
        message.client.channels.cache.get(message.client.data.times_id).send(
            new MessageEmbed()
                .setTitle("Message Sent")
                .addFields([
                    {
                        "name": "Sender",
                        "value": message.author.tag,
                        "inline": true
                    },
                    {
                        "name": "Recepient",
                        "value": number,
                        "inline": true
                    }, 
                    {
                        "name": "body of message",
                        "value": `\`${body}\``,
                        "inline": false
                    }
                ])
                .setColor("GREEN")
                .setFooter(`ID: ${text._id}`)
        );
    }
};