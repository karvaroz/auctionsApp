const { AuctionDB } = require("../database");

const getAllAuctions = async () => {
	try {
		return await AuctionDB.getAllAuctions();
	} catch (error) {
		throw error;
	}
};

const getOneAuctionById = async (auctionById) => {
	try {
		return await AuctionDB.getOneAuctionById(auctionById);
	} catch (error) {
		throw error;
	}
};

const createNewAuction = async (auction) => {
	try {
		return await AuctionDB.createNewAuction(auction);
	} catch (error) {
		throw error;
	}
};

const updateOneAuctionById = async (auctionById, info) => {
	try {
		return await AuctionDB.updateOneAuctionById(auctionById, info);
	} catch (error) {
		throw error;
	}
};

const deleteOneAuctionById = async (auctionById) => {
	try {
		return await AuctionDB.deleteOneAuctionById(auctionById);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllAuctions,
	getOneAuctionById,
	createNewAuction,
	updateOneAuctionById,
	deleteOneAuctionById,
};
