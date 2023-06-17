const { HandleBcrypt, GenerateToken } = require("../helpers");
const { UserModel } = require("../models");
const { UserService } = require("../services");

const loginUser = async (req, res) => {
	try {
		const { email, password } = req.body;

		const user = await UserModel.findOne({ email });

		if (!user) {
			return res.status(404).json({
				status: "FAILED",
				data: { error: "Email not found, please register" },
			});
		}

		const isPasswordCorrect = await HandleBcrypt.compare(
			password,
			user.password
		);

		if (!isPasswordCorrect) {
			return res.status(401).json({
				status: "FAILED",
				data: { error: "Incorrect password" },
			});
		}

		const token = await GenerateToken.tokenSign(user);

		res.status(200).json({
			status: "OK",
			token,
		});
	} catch (error) {
		res.status(error.status || 500).json({
			status: "FAILED",
			data: { error: error.message || error },
		});
	}
};

const registerUser = async (req, res) => {
	try {
		const user = req.body;
		const createUser = await UserService.createNewUser(user);
		if (createUser) {
			res.status(201).json({ status: "OK", data: createUser });
		}
	} catch (error) {
		res.status(error.status || 500).json({
			status: "FAILED",
			data: { error: error.message || error },
		});
	}
};

const getUserById = async (req, res) => {
	const { id } = req.params;

	const user = await UserService.getUserById(id);

	if (!user) {
		return res
			.status(404)
			.json({ status: "NOT FOUND", data: { error: "Not Found" } });
	}

	try {
		res.status(200).json({ status: "OK", data: user });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};
module.exports = {
	loginUser,
	registerUser,
	getUserById,
};
