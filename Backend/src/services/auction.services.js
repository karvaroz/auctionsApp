const { AdModel, AuctionModel } = require("../models")

const createNewAd = async (ad) => {
    const { basePrice, duration } = ad

    const createAd = await new AdModel({
        ...ad,
        currentPrice: basePrice,
        timer: duration
    })

    const auction = await new AuctionModel({
        ad: createAd._id
    })

    await auction.save()

    createAd.auction = auction._id

    return await createAd.save();
}

module.exports = {
    createNewAd
}