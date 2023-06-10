const healthCheck = async (req, res) => {
    try {
        res.status(200).json({ status: "OK", data: { message: "Welcome to Auction App, Everything is Ok" } });
    } catch (error) {
        console.log(error);
        res
            .status(error?.status || 500)
            .json({ status: "FAILED", data: { error: error?.message || error } });
    }
};

module.exports = { healthCheck }