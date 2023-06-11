const { GenerateToken } = require("../../helpers");
const { UserService } = require("../../services");

const isRoleAdmin = async (req, res, next) => {


	try {
		const token = req.headers.authorization.split(" ").pop();
		const tokenData = await GenerateToken.verifyToken(token);

		const userData = await UserService.getUserById(tokenData.id);

		if (userData.role = "Admin") next();

	} catch (error) {


		res.status(403).json({
			status: "ERROR IN ADMIN AUTHENTICATION",
			error
		});
	}
};

module.exports = isRoleAdmin;
