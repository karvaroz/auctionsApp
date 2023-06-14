const { AdModel } = require("../models");
// const socket = require("../utils/socket");

const addBid = async (req, res) => {
	const { id } = req.params;
	const { amount } = req.query;

	const ad = await AdModel.findById(id);

	if (!ad) {
		return res
			.status(404)
			.json({ status: "FAILED", data: { error: "Not Found" } });
	}

	if (parseFloat(amount) <= parseFloat(ad.currentPrice)) {
		return res.status(400).json({
			status: "FAILED",
			data: { error: "Your bid cannot be less than the current price" },
		});
	}

	if (ad.status == "Upcoming" || ad.status == "Closed") {
		return res.status(400).json({
			status: "FAILED",
			data: {
				error: "Auction has ended or has not started",
			},
		});
	}

	try {
		ad.bids.push({ user: req.user, amount: amount });
		ad.currentPrice = amount;
		ad.currentBidder = req.user;

		const adSaved = await ad.save();

		// socket.to(adSaved._id.toString()).emit("offerBid", adSaved);
		console.log("offerBid saved");

		res.status(200).json({
			status: "OK",
			data: adSaved,
		});
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

const getAllBids = async (req, res) => {
	const { id } = req.params;

	const ad = await AdModel.findById(id);

	if (!ad) {
		return res
			.status(404)
			.json({ status: "FAILED", data: { error: "Not Found" } });
	}

	try {
		const allBidsInAd = ad.bids;
		if (ad) {
			return res.status(200).json({
				status: "OK",
				data: allBidsInAd,
				highest: [allBidsInAd[allBidsInAd.length - 1]],
			});
		}
		return res
			.status(404)
			.json({ status: "FAILED", data: { error: "Not Found" } });
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = { addBid, getAllBids };
