const { Server } = require('socket.io');

let io;
let adIo;

const initializeSocket = (server) => {
    io = new Server(server, { cors: { origin: "*" } });
    adIo = new Server(server, { cors: { origin: "*" } });
    return { io, adIo };
}

const getIo = () => {
    if (!io) {
        throw new Error('Socket.io not initialized');
    }
    return io;
}


const getAdIo = () => {
    if (!adIo) {
        throw new Error('Socket.io not initialized');
    }
    return adIo;
}

module.exports = { initializeSocket, getIo, getAdIo };