const { AdModel } = require("../models");

const startAuction = async (req, res) => {
    const { adId } = req.params;

    const ad = await AdModel.findById(adId);

    if (!ad) {
        return res
            .status(404)
            .json({ status: "NOT FOUND", data: { error: "Not Found" } });
    }

    if (ad.status == "Closed") {
        return res.status(400).json({
            status: "FAILED",
            data: { error: "Auction has already ended" },
        });
    }

    if (ad.status == "Open") {
        return res.status(400).json({
            status: "FAILED",
            data: { error: "Auction has already started" },
        });
    }

    try {

        ad.status = "Open";

        const auctionStarted = await ad.save();

        if (auctionStarted)
            return res.status(200).json({
                status: "OK",
                data: auctionStarted,
            });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};





module.exports = { startAuction };
