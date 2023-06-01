const Joi = require("joi");

const Userchema = Joi.object({
	firstName: Joi.string().required(),
	lastName: Joi.string(),
});

module.exports = Userchema;
