const { GenerateToken } = require("../../helpers");

const isAuthenticated = async (req, res, next) => {
	try {
		const token = req.headers.authorization.split(" ").pop();

		const tokenData = await GenerateToken.verifyToken(token);

		if (tokenData) {
			req.user = tokenData.id
			next();
		}

	} catch (error) {
		res.status(403).json({
			status: "ERROR IN AUTHENTICATION",
			error
		});
	}
};

module.exports = isAuthenticated;
