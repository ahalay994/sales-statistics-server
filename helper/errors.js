module.exports = {
    controllerError(res, e) {
        res.status(200).json({
            status: false,
            message: e.message,
        });
    }
};
