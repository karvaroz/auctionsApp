const { getIo, getAdIo } = require("../../utils/socket");

const SocketMiddleware = (req, res, next) => {
    req.io = getIo();
    req.adIo = getAdIo();
    next();
};

module.exports = SocketMiddleware;