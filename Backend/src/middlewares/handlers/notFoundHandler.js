const NotFoundHandler = (err, req, res, next) => {
	const errStatus = err.statusCode || 404;
	const errMsg = err.message || `Page ${req.path} does not exist`;
	res.status(errStatus).json({
		status: errStatus,
		data: errMsg,
	});
};

module.exports = NotFoundHandler;
