const mongoose = require("mongoose");

const User = mongoose.Schema({
	email: {
		type: String,
		required: true,
	},
	password: {
		type: String,
		required: true,
	},
	role: {
		type: String,
		enum: ["admin", "user"],
	},
});

module.exports = mongoose.model("User", User);
