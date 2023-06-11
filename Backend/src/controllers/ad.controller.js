const { AdModel } = require("../models");
const { AdService } = require("../services");

const addAd = async (req, res) => {
	try {
		const ad = req.body;

		const createAd = await AdService.createNewAd(ad);

		if (createAd) res.status(201).json({ status: "OK", data: createAd });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getAllAds = async (req, res) => {
	try {
		const page = parseInt(req.params.page) || 1;
		const limit = parseInt(req.query.limit) || 5;
		const sortField = req.query.sortField || "createdAt";
		const sortOrder = req.query.sortOrder || "asc";

		const sortOptions = {};

		if (sortField) {
			sortOptions[sortField] = sortOrder === "desc" ? -1 : 1;
		}

		const ads = await AdModel.find()
			.sort(sortOptions)
			.skip((page - 1) * limit)
			.limit(limit);

		const totalItems = await AdModel.countDocuments();
		const totalPages = Math.ceil(totalItems / limit);

		if (ads)
			res.status(200).json({
				status: "OK",
				page,
				totalPages,
				data: ads,
			});
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getAdById = async (req, res) => {
	const { id } = req.params;

	const ad = await AdModel.findById(id);

	if (!ad) {
		return res
			.status(404)
			.json({ status: "NOT FOUND", data: { error: "Not Found" } });
	}

	try {
		res.status(200).json({ status: "OK", data: ad });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = { addAd, getAllAds, getAdById };
