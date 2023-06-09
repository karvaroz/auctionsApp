require("dotenv").config();
const express = require('express');
const http = require('http');
const cors = require("cors");
const morgan = require("morgan");

const { MongoDB } = require("./database");
const { ErrorHandler, NotFoundHandler, Socket } = require("./middlewares");
const { AuthRouter, AuctionRouter } = require("./routes");
const { Server } = require("socket.io");

const PORT = process.env.PORT || 3000;
const app = express();
const httpServer = http.createServer(app);
const io = new Server(httpServer)

io.on('connection', (socket) => {
	console.log('### Socket IO client connected');
	socket.on('disconnect', (reason) => {
		console.log('### Socket IO client disconnected');
	});
	socket.on('leaveHome', () => {
		socket.disconnect();
	});
});
adIo.on('connect', (socket) => {
	socket.join('testroom')
	socket.on('joinAd', ({ ad }) => {
		socket.join(ad.toString());
		console.log(`User joined room ${ad}`);
	});
	socket.on('leaveAd', ({ ad }) => {
		socket.leave(ad.toString());
		console.log(`Left room ${ad}`);
	});
	socket.on('disconnect', () => {
		console.log('User has disconnect from ad');
	});
});

app.use(cors());
app.use(
	morgan(":method :url :status :res[content-length] - :response-time ms")
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(ErrorHandler);
app.use(NotFoundHandler);
app.use(Socket);

app.use("/api/v1", AuthRouter);
app.use("/api/v1", AuctionRouter)

const start = async () => {
	try {
		await MongoDB.dbConnectionMongo();
		httpServer.listen(PORT, () => {
			console.log(`🚀 App listening on ${PORT}`);
		});
	} catch (error) {
		console.log(error);
		process.exit(1);
	}
};

start();
