const LoginSchema = require("../joiSchemas/login.schema");

const LoginSchemaValidation = (req, res, next) => {
	const { error } = LoginSchema.validate(req.body, { abortEarly: false });
	if (error) return res.status(422).json({ error });
	next();
};

module.exports = LoginSchemaValidation;
