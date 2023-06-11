const mongoose = require("mongoose");

const ValidMongoId = async (req, res, next) => {
	const { id } = req.params;

	if (!mongoose.Types.ObjectId.isValid(id)) {
		return res.status(400).json({ error: "Invalid ObjectId" });
	}

	next();
};

module.exports = ValidMongoId;
