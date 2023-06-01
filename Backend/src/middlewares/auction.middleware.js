const ProductSchema = require("./auction.schema");

const ProductSchemaValidation = (req, res, next) => {
	const { error } = ProductSchema.validate(req.body, { abortEarly: false });
	if (error) return res.status(422).json({ error });
	next();
};

module.exports = ProductSchemaValidation;
