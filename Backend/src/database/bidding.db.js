const { BiddingModel } = require("../models");

const getAllBiddings = async () => {
	try {
		const biddings = await BiddingModel.find();
		return biddings;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneBiddingById = async (biddingId) => {
	try {
		const biddingById = await BiddingModel.find({ _id: biddingId });
		return biddingById;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const createNewBidding = async (bidding) => {
	try {
		const createBidding = await new BiddingModel(bidding).save();
		return createBidding;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const updateOneBiddingById = async (biddingId, dataUpdated) => {
	try {
		const biddingUpdated = await BiddingModel.findByIdAndUpdate(
			{ _id: biddingId },
			dataUpdated,
			{
				returnDocument: "after",
			}
		);
		return biddingUpdated;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const deleteOneBiddingById = async (biddingId) => {
	try {
		const biddingToDelete = await BiddingModel.findByIdAndRemove({
			_id: biddingId,
		});
		if (!biddingToDelete) {
			throw {
				status: 400,
				message: `Can't find bidding with the id '${biddingId}'`,
			};
		}
	} catch (error) {
		throw { status: 500, message: error };
	}
};

module.exports = {
	getAllBiddings,
	getOneBiddingById,
	createNewBidding,
	updateOneBiddingById,
	deleteOneBiddingById,
};
