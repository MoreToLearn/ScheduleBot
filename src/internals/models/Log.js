const { Schema, model } = require("mongoose");

const log = new Schema({
	"_id": String,
	"msg_id": String,
	"name": String,
	"time": String,
	"description": String,
	"verified": Boolean,
	"verifier": String,
});

module.exports = model("log", log);