const { RoomModel } = require("../models");
// const socket = require("../utils/socket");

const joinRoom = async (req, res) => {
	const { user } = req;
	const { id } = req.params;

	const room = await RoomModel.findById(id);

	if (!room) {
		return res
			.status(404)
			.json({ status: "NOT FOUND", data: { error: "Not Found" } });
	}

	const userInRoom = room?.users?.find((roomUser) => roomUser == user);

	if (!userInRoom) {
		return res
			.status(400)
			.json({ status: "FAILED", data: { error: "User already in room" } });
	}

	try {
		room.users.push(user);

		await room.save();

		console.log("UserJoinRoom");

		res.status(200).json({
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
	const { id } = req.params;
	try {
		const room = await RoomModel.findById(id);

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

module.exports = { joinRoom, getRoom };
