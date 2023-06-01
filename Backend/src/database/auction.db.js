const { AuctionModel } = require("../models");

const getAllAuctions = async () => {
	try {
		const auctions = await AuctionModel.find();
		return auctions;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const getOneAuctionById = async (auctionId) => {
	try {
		const auctionById = await AuctionModel.find({ _id: auctionId });
		return auctionById;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const createNewAuction = async (auction) => {
	try {
		const createAuction = await new AuctionModel(auction).save();
		return createAuction;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const updateOneAuctionById = async (auctionId, dataUpdated) => {
	try {
		const auctionUpdated = await AuctionModel.findByIdAndUpdate(
			{ _id: auctionId },
			dataUpdated,
			{
				returnDocument: "after",
			}
		);
		return auctionUpdated;
	} catch (error) {
		throw { status: 500, message: error };
	}
};

const deleteOneAuctionById = async (auctionId) => {
	try {
		const auctionToDelete = await AuctionModel.findByIdAndRemove({
			_id: auctionId,
		});
		if (!auctionToDelete) {
			throw {
				status: 400,
				message: `Can't find auction with the id '${auctionId}'`,
			};
		}
	} catch (error) {
		throw { status: 500, message: error };
	}
};

module.exports = {
	getAllAuctions,
	getOneAuctionById,
	createNewAuction,
	updateOneAuctionById,
	deleteOneAuctionById,
};
