const Userchema = require("./user.schema");

const UserSchemaValidation = (req, res, next) => {
	const { error } = Userchema.validate(req.body, { abortEarly: false });
	if (error) return res.status(422).json({ error });
	next();
};

module.exports = UserSchemaValidation;
