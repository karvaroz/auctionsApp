const { AdModel, RoomModel } = require("../models")

const createNewAd = async (ad) => {
    const { basePrice, duration } = ad

    const createAd = await new AdModel({
        ...ad,
        currentPrice: basePrice,
        timer: duration
    })

    const room = await new RoomModel({
        ad: createAd._id
    })

    await room.save()

    createAd.room = room._id

    return await createAd.save();
}

module.exports = {
    createNewAd
}