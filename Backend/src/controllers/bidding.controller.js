const { BiddingService } = require("../services");

const getAllBiddings = async (req, res) => {
	try {
		const bidding = await BiddingService.getAllBiddings();
		res
			.status(200)
			.json({ status: "OK", total: bidding.length, data: bidding });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneBiddingById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parameter ':id' can not be empty" },
		});
		return;
	}

	try {
		const biddingById = await BiddingService.getOneBiddingById(id);
		res.status(200).json({ status: "OK", data: biddingById });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewBidding = async (req, res) => {
	const bidding = req.body;

	try {
		const createBidding = await BiddingService.createNewBidding(bidding);
		res.status(201).json({ status: "OK", data: createBidding });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneBiddingById = async (req, res) => {
	const { id } = req.params;
	const biddingInfo = req.body;
	try {
		await BiddingService.updateOneBiddingById(id, biddingInfo);
		res.status(200).json({ status: "OK", data: `Bidding ${id} updated` });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneBiddingById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({
			status: "FAILED",
			data: { error: "Parameter ':id' can not be empty" },
		});
		return;
	}
	try {
		await BiddingService.deleteOneBiddingById(id);
		res.status(200).json({ status: "OK", data: `Bidding ${id} deleted` });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = {
	getAllBiddings,
	getOneBiddingById,
	createNewBidding,
	updateOneBiddingById,
	deleteOneBiddingById,
};
