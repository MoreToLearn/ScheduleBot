module.exports = {
    "name": "meeting",
    "execute": async (message, [hours, minutes, ...people_info]) => {
        for (let x = 0; x < people_info.length; x++) {
            let person = {
                name: people_info[x],
            };
            logMember(message.client, {
                name: person.name,
                hours: hours,
                minutes: minutes,
                verifier: message.author.id
            });
        }
        return message.channel.send("Board meeting logged.")
    }
};

function logMember(client, {
    name,
    hours,
    minutes,
    verifier
}) {
    client.times.create(client.generateID(1000, 10000), {
        "name": name,
        "description": "CONDUCTED BOARD MEETING",
        "time": {
            "hours": hours,
            "minutes": minutes
        },
        "tutee": {
            "name": null,
            "contact": null,
            "grade": null
        },
        "subject": "BOARD_MEETING",
        "date": new Date(),
        "msg_id": null,
        "verified": true,
        "verifier": verifier,
        "submitter": verifier
    });
}