const mongoose = require("mongoose");

const Bidding = mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	description: {
		type: String,
	},
	quantity: {
		type: Number,
		required: false,
		default: 0,
	},
	price: {
		type: Number,
		required: true,
	},
	category: {
		type: String,
		required: true,
	},
});

module.exports = mongoose.model("Bidding", Bidding);
