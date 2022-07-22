const auth = require('../services/auth.service');
const createError = require('http-errors');
const {controllerError, controllerSuccess} = require("../helper/controller.helper");
const {userDto} = require("../dto/user.dto");

class AuthController {
    static model = 'auth';

    static register = async (req, res) => {
        try {
            const data = await auth.register(req.body);
            return controllerSuccess(res, 'register', this.model, null, userDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }
    static login = async (req, res) => {
        try {
            const data = await auth.login(req.body);
            console.dir(data);
            return controllerSuccess(res, 'login', this.model, null, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = AuthController;
