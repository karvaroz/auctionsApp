const AdSchema = require("../joiSchemas/ad.schema");

const AdSchemaValidation = (req, res, next) => {
    const { error } = AdSchema.validate(req.body, { abortEarly: false });
    if (error) return res.status(422).json({ error });
    next();
};

module.exports = AdSchemaValidation;
