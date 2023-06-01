const Joi = require("joi");

const mongoId = Joi.string()
	.pattern(new RegExp("^[0-9a-fA-F]{24}$"))
	.required();

const ValidMongoId = async (req, res, next) => {
	const { id } = req.params;
	const { error } = await mongoId.validate(id);
	if (error) return res.status(422).json({ error });
	next();
};

module.exports = ValidMongoId;
