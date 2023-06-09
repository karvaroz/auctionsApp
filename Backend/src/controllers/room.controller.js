const joinAuction = async (req, res) => {
    const { user } = req;
    const { auctionId } = req.params;
    try {
        const auction = await AuctionModel.findById(auctionId);

        const userInAuction = auction.users.find((auctionUser) => {
            return auctionUser._id == user.id ? true : false;
        });

        if (userInAuction) {
            res
                .status(404)
                .json({ status: "FAILED", data: { error: "User already joined" } });
        }

        auction.users.push(user.id);

        const auctionSaved = await auction.save();
        if (auctionSaved)
            res.status(200).json({
                status: "OK",
                data: auctionSaved,
            });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

const getAuction = async (req, res) => {
    const { auctionId } = req.params;
    try {
        const auction = await AuctionModel.findById(auctionId);

        if (auction)
            res.status(200).json({
                status: "OK",
                data: auction,
            });
    } catch (error) {
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { joinAuction, getAuction }