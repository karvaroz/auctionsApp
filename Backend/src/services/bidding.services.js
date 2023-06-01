const { BiddingDB } = require("../database");

const getAllBiddings = async () => {
	try {
		return await BiddingDB.getAllBiddings();
	} catch (error) {
		throw error;
	}
};

const getOneBiddingById = async (biddingById) => {
	try {
		return await BiddingDB.getOneBiddingById(biddingById);
	} catch (error) {
		throw error;
	}
};

const createNewBidding = async (bidding) => {
	try {
		return await BiddingDB.createNewBidding(bidding);
	} catch (error) {
		throw error;
	}
};

const updateOneBiddingById = async (biddingById, info) => {
	try {
		return await BiddingDB.updateOneBiddingById(biddingById, info);
	} catch (error) {
		throw error;
	}
};

const deleteOneBiddingById = async (biddingById) => {
	try {
		return await BiddingDB.deleteOneBiddingById(biddingById);
	} catch (error) {
		throw error;
	}
};

module.exports = {
	getAllBiddings,
	getOneBiddingById,
	createNewBidding,
	updateOneBiddingById,
	deleteOneBiddingById,
};
