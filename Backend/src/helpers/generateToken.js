const jwt = require("jsonwebtoken");

const tokenSign = async (user) => {
	return jwt.sign(
		{
			id: user.id,
			role: user.role,
		},
		process.env.JWT_SECRET_KEY,
		{
			expiresIn: "2h",
		}
	);
};

const verifyToken = async (token) => {
	try {
		return jwt.verify(token, process.env.JWT_SECRET_KEY);
	} catch (error) {
		return null;
	}
};

module.exports = { tokenSign, verifyToken };
