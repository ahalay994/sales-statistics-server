const userService = require('../services/user.service');
const {controllerError, controllerSuccess} = require('../helper/controller.helper');
const { userDto, usersDto } = require("../dto/user.dto");

class UserController {
    static model = 'user';

    static get = async (req, res) => {
        try {
            const data = await userService.get(req.params.id);
            return controllerSuccess(res, 'get', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static all = async (req, res) => {
        try {
            const data = await userService.all();
            return controllerSuccess(res, 'all', this.model, data.id, usersDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static create = async (req, res) => {
        try {
            const data = await userService.create(req.body, req.user.payload);
            return controllerSuccess(res, 'create', this.model, null, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static update = async (req, res) => {
        try {
            const data = await userService.create(req.params.id, req.user.payload);
            return controllerSuccess(res, 'update', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static resetPassword = async (req, res) => {
        try {
            const id = req?.params?.id ? Number(req?.params?.id) : Number(req.user.payload.id);
            const data = await userService.resetPassword(req.body.password, req.user.payload);
            return controllerSuccess(res, 'resetPassword', this.model, data.id, null);
        } catch (e) {
            controllerError(res, e);
        }
    }
    static delete = async (req, res) => {
        try {
            const data = await userService.delete(req.params.id, req.user.payload);
            return controllerSuccess(res, 'delete', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static restore = async (req, res) => {
        try {
            const data = await userService.restore(req.params.id, req.user.payload);
            return controllerSuccess(res, 'restore', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = UserController;
