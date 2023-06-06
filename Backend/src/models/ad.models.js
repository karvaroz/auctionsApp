const mongoose = require('mongoose');

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
            type: Number
        },
        duration: {
            type: Number,
            default: 300,
        },
        timer: {
            type: Number,
            default: 300,
        },
        image: {
            type: String,
            default: process.env.IMAGE_URL
        },
        status: {
            type: String,
            enum: ["Upcoming", "Open", "Closed"],
            default: "Upcoming",
        },
        purchasedBy: {
            type: mongoose.Types.ObjectId,
            ref: "UserCollection",
        },
        currentBidder: {
            type: mongoose.Types.ObjectId,
            ref: "UserCollection",
        },
        bids: [
            {
                user: {
                    type: mongoose.Types.ObjectId,
                    ref: "UserCollection",
                    required: true,
                },
                amount: {
                    type: Number,
                    required: true,
                }
            },
        ],
        auction: {
            type: mongoose.Types.ObjectId,
            ref: "AuctionCollection",
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model("AdCollection", Ad);