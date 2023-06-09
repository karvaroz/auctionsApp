const mongoose = require("mongoose");

const Room = mongoose.Schema(
    {
        ad: {
            type: mongoose.Schema.Types.ObjectId,
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

module.exports = mongoose.model("RoomCollection", Room);
