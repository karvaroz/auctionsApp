const { GenerateToken } = require("../../helpers");
const { UserService } = require("../../services");

const isRoleAdmin = async (req, res, next) => {
	const token = req.headers.authorization.split(" ").pop();
	const tokenData = await GenerateToken.verifyToken(token);

	const userData = await UserService.getUserById(tokenData.id);

	if (userData.role = "Admin") {
		next();
		return;
	}

	res.status(403).json({
		status: "YOU DO NOT HAVE AN ADMIN ROLE",
	});
};

module.exports = isRoleAdmin;
