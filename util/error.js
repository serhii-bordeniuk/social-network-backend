const handleCatchError = (err, next) => {
    if (!err.statusCode) {
        err.statusCode = 500;
    }
    return next(err);
};

module.exports = handleCatchError;
