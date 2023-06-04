const mongoose = require("mongoose");

const Auction = mongoose.Schema(
	{
		product: {
			type: String,
			required: true,
		},
		description: {
			type: String,
			required: false,
			default: 0,
		},
		minBidAmount: {
			type: Number,
			required: true,
			default: 100,
		},
		time: {
			type: Number,
			required: true,
		},
		image: {
			type: String,
			required: true,
		},
		status: {
			type: String,
			enum: ["Upcoming", "Open", "Closed"],
			default: "Upcoming",
		},
	},
	{
		timestamps: true,
	}
);

module.exports = mongoose.model("Auction", Auction);
