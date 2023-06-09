const mongoose = require("mongoose");

const User = mongoose.Schema(
	{
		username: {
			type: String,
			required: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		role: {
			type: String,
			enum: ["Admin", "User"],
			default: "User",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("UserCollection", User);
