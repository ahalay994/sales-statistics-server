const {getApi, allApi, createApi, updateApi, deleteOrRestore} = require("../api");

class ServiceClass {
    constructor(model) {
        this.model = model;
    }
}

module.exports = ServiceClass;
