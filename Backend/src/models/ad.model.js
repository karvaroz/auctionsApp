const mongoose = require("mongoose");

const Ad = mongoose.Schema(
	{
		productName: {
			type: String,
			required: true,
		},
		description: {
			type: String,
		},
		basePrice: {
			type: Number,
			required: true,
		},
		currentPrice: {
			type: Number,
		},
		duration: {
			type: Number,
			default: 15,
		},
		timer: {
			type: Number,
			default: 15,
		},
		image: {
			type: String,
			default: process.env.IMAGE_URL,
		},
		category: {
			type: String,
			enum: ["Vehicles", "Properties", "Others"],
			default: "Others",
		},
		status: {
			type: String,
			enum: ["Upcoming", "Open", "Closed"],
			default: "Upcoming",
		},
		purchasedBy: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserCollection",
		},
		currentBidder: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "UserCollection",
		},
		bids: [
			{
				user: {
					type: mongoose.Schema.Types.ObjectId,
					ref: "UserCollection",
					required: true,
				},
				amount: {
					type: Number,
					required: true,
				},
				time: {
					type: Date,
					default: Date.now,
				},
			},
		],
		room: {
			type: mongoose.Schema.Types.ObjectId,
			ref: "RoomCollection",
		},
	},
	{ timestamps: true }
);

module.exports = mongoose.model("AdCollection", Ad);
