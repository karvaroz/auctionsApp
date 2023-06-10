const { RoomModel } = require("../models");

const joinRoom = async (req, res) => {
    const { user } = req;
    const { roomId } = req.params;

    const room = await RoomModel.findById(roomId);

    const userInRoom = room.users.find((roomUser) => roomUser == user);

    if (userInRoom) {
        return res
            .status(400)
            .json({ status: "FAILED", data: { error: "User already joined" } });
    }

    try {

        room.users.push(user);

        const roomSaved = await room.save();
        if (roomSaved)
            return res.status(200).json({
                status: "OK",
                data: roomSaved,
            });

    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getRoom = async (req, res) => {
    const { roomId } = req.params;
    try {
        const room = await RoomModel.findById(roomId);

        if (room)
            res.status(200).json({
                status: "OK",
                data: room,
            });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { joinRoom, getRoom }