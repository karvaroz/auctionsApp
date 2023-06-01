const { AuctionService } = require("../services");

const getAllAuctions = async (req, res) => {
	try {
		const auctions = await AuctionService.getAllAuctions();
		res
			.status(200)
			.json({ status: "OK", total: auctions.length, data: auctions });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getOneAuctionById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).send({
			status: "FAILED",
			data: { error: "Parameter ':id' can not be empty" },
		});
		return;
	}

	try {
		const auctionById = await AuctionService.getOneAuctionById(id);
		res.status(200).json({ status: "OK", data: auctionById });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const createNewAuction = async (req, res) => {
	const auction = req.body;

	try {
		const createAuction = await AuctionService.createNewAuction(auction);
		res.status(201).json({ status: "OK", data: createAuction });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const updateOneAuctionById = async (req, res) => {
	const { id } = req.params;
	const auctionInfo = req.body;
	try {
		await AuctionService.updateOneAuctionById(id, auctionInfo);
		res.status(200).json({ status: "OK", data: `Auction ${id} updated` });
	} catch (error) {
		console.log(error);
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const deleteOneAuctionById = async (req, res) => {
	const { id } = req.params;

	if (!id) {
		res.status(400).json({
			status: "FAILED",
			data: { error: "Parameter ':id' can not be empty" },
		});
		return;
	}
	try {
		await AuctionService.deleteOneAuctionById(id);
		res.status(200).json({ status: "OK", data: `Auction ${id} deleted` });
	} catch (error) {
		console.log(error);

		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = {
	getAllAuctions,
	getOneAuctionById,
	createNewAuction,
	updateOneAuctionById,
	deleteOneAuctionById,
};
