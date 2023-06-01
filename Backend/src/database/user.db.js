const { UserModel } = require("../models");

const getAllUsers = async () => {
	try {
		return await UserModel.findAll();
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneUserById = async (userId) => {
	try {
		return await UserModel.findByPk(userId);
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const createNewUser = async (user) => {
	try {
		return await UserModel.create(user);
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const updateOneUserById = async (userId, dataUpdated) => {
	try {
		const userUpdated = await UserModel.update(dataUpdated, {
			returning: true,
			where: {
				id: userId,
			},
		});
		return userUpdated;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const deleteOneUserById = async (userId) => {
	try {
		const userToDelete = await UserModel.destroy({
			where: {
				id: userId,
			},
		});
		if (!userToDelete) {
			throw {
				status: 400,
				message: `Can't find user with the id '${userId}'`,
			};
		}
	} catch (error) {
		throw { status: 500, message: error };
	}
};

module.exports = {
	getAllUsers,
	getOneUserById,
	createNewUser,
	updateOneUserById,
	deleteOneUserById,
};
