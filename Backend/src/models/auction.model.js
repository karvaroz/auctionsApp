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
		basePrice: {
			type: Number,
			required: true,
			default: 100,
		},
		duration: {
			type: Number,
			required: true,
			default: 300,
		},
		timer: {
			type: Number,
			default: 300,
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
