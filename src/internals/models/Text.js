const { Schema, model } = require("mongoose");

const Text = new Schema({
    "_id": String,
    "from": String,
    "to": String,
    "body": String,
    "sender": String,
    "date": {
        "type": Date,
        "default": new Date()
    }
});

module.exports = model("text", Text);