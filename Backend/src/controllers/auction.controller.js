const { AdModel } = require("../models");
const { AuctionService } = require("../services");

const addAd = async (req, res) => {
    try {
        const ad = req.body

        const createAd = await AuctionService.createNewAd(ad);

        if (createAd) res.status(201).json({ status: "OK", data: createAd });

    } catch (error) {
        console.log(error)
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllAds = async (req, res) => {
    try {
        const ads = await AdModel.find();
        if (ads)
            res.status(200).json({
                status: "OK",
                data: ads
            });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const addBid = async (req, res) => {
    try {
        res.status(200).json({
            status: "OK",
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAllBids = async (req, res) => {
    try {
        res.status(200).json({
            status: "OK",
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const joinAuction = async (req, res) => {
    try {
        res.status(200).json({
            status: "OK",
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAuction = async (req, res) => {
    try {
        res.status(200).json({
            status: "OK",
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const startAuction = async (req, res) => {
    try {
        res.status(200).json({
            status: "OK",
        });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = {
    addAd,
    getAllAds,
    addBid,
    getAllBids,
    joinAuction,
    getAuction,
    startAuction,
};
