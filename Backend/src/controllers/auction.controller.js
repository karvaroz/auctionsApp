const { AdModel } = require("../models");
// const socket = require("../utils/socket");

const startAuction = async (req, res) => {
	const { id } = req.params;

	try {
		const ad = await AdModel.findById(id);

		if (!ad) {
			return res
				.status(404)
				.json({ status: "NOT FOUND", data: { error: "Not Found" } });
		}

		if (ad.status === "Closed") {
			return res.status(400).json({
				status: "FAILED",
				data: { error: "Auction has already ended" },
			});
		}

		if (ad.status === "Open") {
			return res.status(400).json({
				status: "FAILED",
				data: { error: "Auction has already started" },
			});
		}

		ad.status = "Open";
		await ad.save();

		console.log("auctionStarted");
		// socket.to(ad._id.toString()).emit("auctionStarted", ad);

		res.status(200).json({ status: "OK", data: ad });

		ad.timer = parseInt(ad.duration);
		let duration = parseInt(ad.duration);
		let timer = parseInt(ad.timer);

		console.log(`Countdown started for ${timer} seconds.`);

		const interval = setInterval(async () => {
			if (timer > 0) {
				timer -= 1;
				console.log(`Countdown: ${timer} seconds remaining.`);

				(await ad.updateOne({ timer: timer })) &&
					console.log("Ad timer request updated");
			} else {
				(await ad.updateOne({ status: "Closed" })) && console.log("Ad closed");
			}
		}, 1000);

		setTimeout(async () => {
			await ad.updateOne({ status: "Closed" });
			console.log("Countdown finished.");
			console.log("Ad closed");
			clearInterval(interval);

			const adEnded = await AdModel.findById(ad._id);

			if (!adEnded.currentBidder)
				return console.log("Auction closed with No current bidder");

			adEnded.purchasedBy = adEnded.currentBidder;
			await adEnded.save();
			console.log("Sold to a current bidder");
		}, (duration + 1) * 1000);
	} catch (error) {
		res
			.status(error?.status || 500)
			.json({ status: "FAILED", data: { error: error?.message || error } });
	}
};

module.exports = { startAuction };
