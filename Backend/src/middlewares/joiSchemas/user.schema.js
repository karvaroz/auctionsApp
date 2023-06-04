const Joi = require("joi");

const UserSchema = Joi.object({
	username: Joi.string().required(),
	email: Joi.string().email().required(),
	password: Joi.string().required(),
	role: Joi.string(),
});

module.exports = UserSchema;
