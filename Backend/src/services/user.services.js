const { HandleBcrypt } = require("../helpers");
const { UserModel } = require("../models");

const getUserById = async (userId) => {
    try {
        return await UserModel.find({ _id: userId });
    } catch (error) {
        throw error;
    }
};

const createNewUser = async (user) => {
    try {
        const { password } = user;
        const passwordHash = await HandleBcrypt.encrypt(password);

        const createUser = await new UserModel({
            ...user,
            password: passwordHash,
        })

        return await createUser.save();

    } catch (error) {
        throw error;
    }
};

module.exports = { getUserById, createNewUser };