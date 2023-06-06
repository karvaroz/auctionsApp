const mongoose = require("mongoose");

const Auction = mongoose.Schema(
    {
        ad: {
            type: mongoose.Types.ObjectId,
            ref: "AdCollection",
            required: true,
        },
        users: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "UserCollection",
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("AuctionCollection", Auction);
