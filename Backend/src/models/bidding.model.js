const mongoose = require("mongoose");

const Bidding = mongoose.Schema({
	author: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
	product: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Auction",
	},
	bidAmount: {
		type: Number,
		required: true,
	},
});

module.exports = mongoose.model("Bidding", Bidding);
