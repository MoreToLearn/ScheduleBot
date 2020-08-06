const { Schema, model } = require("mongoose");

const position = new Schema(
	{
		"_id": String,
		"msg_id": String,
		"email": String,
		"description": String,
		"taken": Boolean,
		"claimer": String
	}
);

module.exports = model("position", position);