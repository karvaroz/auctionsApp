const mongoose = require("mongoose");

const Auction = mongoose.Schema({
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

module.exports = mongoose.model("Auction", Auction);
