const Joi = require("joi");

const ProductSchema = Joi.object({
	name: Joi.string().alphanum().required(),
	description: Joi.string().alphanum(),
	quantity: Joi.number().required(),
	price: Joi.number().required(),
	category: Joi.string().required(),
});

module.exports = ProductSchema;
