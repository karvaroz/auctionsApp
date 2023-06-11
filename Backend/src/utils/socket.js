module.exports = (socket) => {
	// console.log("Client connected");

	socket.on("userLoggedIn", (token) => {
		socket.broadcast.emit("userLoggedIn", token);
		console.log(token);
	});

	socket.on("auctionCreated", (token) => {
		socket.broadcast.emit("auctionCreated", token);
		console.log(token);
	});

	// socket.emit("Close", () => {
	// 	console.log("Connection closed");
	// });
};
