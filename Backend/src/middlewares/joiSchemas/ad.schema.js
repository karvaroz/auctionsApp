const Joi = require("joi");

const AdSchema = Joi.object({
    productName: Joi.string().required(),
    description: Joi.string(),
    basePrice: Joi.number().positive().greater(0).required(),
    currentPrice: Joi.number().positive().greater(0),
    duration: Joi.number().positive().greater(0).max(3600),
    timer: Joi.number().positive().greater(0),
    image: Joi.string(),
    status: Joi.string(),
    purchasedBy: Joi.string(),
    currentBidder: Joi.string(),
    bids: Joi.array()
});

module.exports = AdSchema;
