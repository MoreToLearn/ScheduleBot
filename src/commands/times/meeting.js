module.exports = {
    "name": "meeting",
    "execute": async (message, [date, hours, minutes, ...people_info]) => {
        for (let x = 0; x < people_info.length; x += 2) {
            let person = {
                name: `${people_info[x]} ${people_info[x+1]}`,
            };
            const parse_date = isNaN(Date.parse(date)) ? new Date() : Date.parse(date);
            logMember(message.client, {
                name: person.name,
                hours: hours,
                minutes: minutes,
                date: parse_date,
                verifier: message.author.id
            });
        }
        return message.channel.send("Board meeting logged.");
    }
};

function logMember(client, {
    name,
    hours,
    minutes,
    verifier,
    date
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
        "date": date,
        "msg_id": null,
        "verified": true,
        "verifier": verifier,
        "submitter": verifier
    });
}