const twilio = require("twilio");
const Manager = require("./Manager");

class TextManager extends Manager {
    constructor(id, token, numbers, id_generator) {
        super("texts", "text");
        if (!id || !token) throw new Error("You must provide a valid ID and TOKEN.");
        if (!numbers || !(numbers instanceof Array) || !numbers.length) throw new Error("You must provide an array of phone numbers owned by the account");
        this._generateID = id_generator;
        this._numbers = numbers;
        this._twilio = new twilio(id, token);
    }
    async logs(input, page = 1) {
        return this.model.find({
            "$or": [
                {
                    "to": input
                },
                {
                    "sender": input
                }
            ]
        }).limit(page * 10);
    }
    async findPreviousNumber(number) {
        let search = await this.model.findOne({ "to": number });
        return search ? search.from : null;
    }
    async send(recepient, body, sender_id) {
        let from = await this.findPreviousNumber(recepient) || this._numbers[Math.floor(Math.random() * this._numbers.length)];
        await this._twilio.messages.create({
            "body": body,
            "to": recepient,
            "from": from
        });
        let text = new this.model({
            "_id": this._generateID(1000, 10000),
            "from": from,
            "to": recepient,
            "body": body,
            "sender": sender_id
        });
        return text.save();
    }
}

module.exports = TextManager;