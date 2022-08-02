const AccessService = require('../services/access.service');
const {controllerError, controllerSuccess} = require('../helper/controller.helper');
const { accessDto, accessesPaginationDto } = require("../dto/access.dto");
const bcrypt = require("bcryptjs");

class AccessController {
    static model = 'access';
    static accessService = new AccessService(this.model, {}, false);

    /*** Private functions ***/
    static #getPaginationParams(query) {
        const { page = 1, limit = 10 } = query;
        return {page, limit}
    }
    /*** Private functions ***/

    static get = async (req, res) => {
        try {
            const data = await this.accessService.get(req.params.key);
            return controllerSuccess(res, 'get', this.model, data.id, accessDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static all = async (req, res) => {
        try {
            const { page, limit } = AccessController.#getPaginationParams(req.query);
            delete req.query?.page;
            delete req.query?.limit;
            // get
            let query = {...req.query};
            const data = await this.accessService.all({page, limit}, query);
            // get all records
            query = {...req.query};
            const dataAll = await this.accessService.all({}, query);
            return controllerSuccess(res, 'all', this.model, data.id, accessesPaginationDto(data, page, limit, dataAll));
        } catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = AccessController;
