const { AdModel, AuctionModel } = require("../models");
const { AuctionService } = require("../services");

const startAuction = async (req, res) => {
    const { adId } = req.params;
    try {
        const ad = await AdModel.findById(adId);

        if (!ad) {
            res
                .status(404)
                .json({ status: "NOT FOUND", data: { error: "Not Found" } });
        }
        if (ad.status == "Closed") {
            res.status(400).json({
                status: "FAILED",
                data: { error: "Auction has already ended" },
            });
        }

        if (ad.status == "Open") {
            res.status(400).json({
                status: "FAILED",
                data: { error: "Auction has already started" },
            });
        }

        ad.status = "Open";

        const auctionStarted = await ad.save();

        if (auctionStarted)
            res.status(200).json({
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
