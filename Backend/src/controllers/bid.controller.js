const addBid = async (req, res) => {
    const { adId } = req.params;
    const { amount } = req.query;
    try {
        const ad = await AdModel.findById(adId);

        if (!ad) {
            return res
                .status(404)
                .json({ status: "NOT_FOUND", data: { error: "Not Found" } });
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
                    error:
                        "As the auction has not yet begun or ended, you are unable to put a bid",
                },
            });
        }

        const updateAd = {
            ...ad,
            bids: ad?.bids?.push({ user: req.user, amount: amount }),
            currentPrice: amount,
            currentBidder: req.user
        }

        const adSaved = await updateAd.save();

        if (adSaved)
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
    const { adId } = req.params;

    try {
        const ad = await AdModel.find({ _id: adId });

        if (!ad) {
            res
                .status(404)
                .json({ status: "NOT_FOUND", data: { error: "Not Found" } });
        }

        res.status(200).json({
            status: "OK",
            data: ad.bids,
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { addBid, getAllBids }