const UserSchema = require("../joiSchemas/user.schema");

const UserSchemaValidation = (req, res, next) => {
	const { error } = UserSchema.validate(req.body, { abortEarly: false });
	if (error) return res.status(422).json({ error });
	next();
};

module.exports = UserSchemaValidation;
