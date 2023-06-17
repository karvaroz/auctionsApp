module.exports = async (socket) => {
	const onlineUsers = [];

	// console.log("New connection =>", socket.id);

	socket.on("userLoggedIn", (userId) => {
		console.log("userLoggedIn");

		// const userIsIn = onlineUsers.some((user) => user.userId === userId);
		// if (!userIsIn)
		onlineUsers.push({
			userId,
			socketId: socket.id,
		});

		socket.broadcast.emit("getOnlineUsers", onlineUsers);

		console.log(onlineUsers);
	});

	socket.on("auctionCreated", (auction) => {
		// socket.broadcast.emit("auctionCreated", auction);
		console.log("auctionCreated");
	});

	socket.on("UserJoinRoom", (userId, room) => {
		// socket.broadcast.to(room._id).emit("UserJoinRoom", room);
		// socket.broadcast.emit("UserJoinRoom", room);
		console.log("UserJoinRoom");
	});

	socket.on("auctionStarted", (auction) => {
		// socket.broadcast.to(auction._id).emit("auctionStarted", auction);
		// socket.broadcast.emit("auctionStarted", auction);
		console.log("auctionStarted");
	});

	socket.on("offerBid", (bid) => {
		const user = onlineUsers.find((user) => user.userId === bid.userId);
		if (user) {
			io.to(user.socketId).emit("getBids", bid);
		}
		// socket.broadcast.to(auction._id).emit("offerBid", bid);
		// socket.broadcast.emit("offerBid", bid);
		console.log("offerBid");
	});

	// socket.on("disconnect", () => {
	// 	let onlineUsers = onlineUsers.filter((user) => user.socketId !== socket.id);
	// 	socket.broadcast.emit("getOnlineUsers", onlineUsers);
	// });
	// socket.emit("Close", () => {
	// 	console.log("Connection closed");
	// });
};
