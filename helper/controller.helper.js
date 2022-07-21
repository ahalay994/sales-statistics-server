const message = require('./message');

const controllerError = (res, e) => {
    res.status(200).json({
        status: false,
        message: e.message,
    });
};

const controllerSuccess = (res, method, model, id = null, data = null) => {
    let json = {
        status: true,
        message: message[model](id)[method]
    };
    data && (json = data?.data ? {...json, ...data} : {...json, data});

    return res.status(200).json(json);
}

module.exports = {
    controllerError,
    controllerSuccess,
};
