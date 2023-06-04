const { HandleBcrypt, GenerateToken } = require("../helpers");
const { UserModel } = require("../models");
const { UserService } = require("../services");

const loginUser = async (req, res) => {
	const { email, password } = req.body;

	const isUserRegistered = await UserModel.findOne({ email });

	if (!isUserRegistered) {
		res.status(404).json({
			status: "FAILED",
			data: { error: "Email not found, please register" },
		});
		return;
	}

	const isPasswordCorrect = await HandleBcrypt.compare(
		password, isUserRegistered.password
	);

	if (!isPasswordCorrect) {
		res.status(401).json({
			status: "FAILED",
			data: { error: "Incorrect password" },
		});
		return;
	}

	try {
		const token = await GenerateToken.tokenSign(isUserRegistered);

		res.status(200).json({
			status: "OK",
			token
		});
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const registerUser = async (req, res) => {
	try {
		const user = req.body;
		const createUser = await UserService.createNewUser(user);
		if (createUser) res.status(201).json({ status: "OK", data: createUser });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};
module.exports = {
	loginUser,
	registerUser,
};
