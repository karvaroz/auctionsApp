const { UserService } = require("../services");

const getAllUsers = async (req, res) => {
	try {
		const users = await UserService.getAllUsers();
		res.status(200).json({ status: "OK", total: users.length, data: users });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneUserById = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parameter ':userId' can not be empty" },
		});
		return;
	}

	try {
		const userById = await UserService.getOneUserById(userId);
		res.status(200).json({ status: "OK", data: userById });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewUser = async (req, res) => {
	const user = req.body;

	try {
		const createUser = await UserService.createNewUser(user);
		res.status(201).json({ status: "OK", data: createUser });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneUserById = async (req, res) => {
	const { userId } = req.params;
	const userInfo = req.body;
	try {
		await UserService.updateOneUserById(userId, userInfo);
		res.status(200).json({ status: "OK", data: `User ${userId} updated` });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};
const deleteOneUserById = async (req, res) => {
	const { userId } = req.params;

	if (!userId) {
		res.status(400).json({
			status: "FAILED",
			data: { error: "Parameter ':userId' can not be empty" },
		});
		return;
	}
	try {
		await UserService.deleteOneUserById(userId);
		res.status(200).json({ status: "OK", data: `Product ${userId} deleted` });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = {
	getAllUsers,
	getOneUserById,
	createNewUser,
	updateOneUserById,
	deleteOneUserById,
};
