const { GenerateToken } = require("../../helpers");

const isAuthenticated = async (req, res, next) => {
	const token = req.headers.authorization.split(" ").pop();
	const tokenData = await GenerateToken.verifyToken(token);

	if (tokenData) {
		req.user = tokenData.id
		next();
		return;
	}

	res.status(401).json({
		status: "AUTHENTICATION FAILED",
	});
};

module.exports = isAuthenticated;
