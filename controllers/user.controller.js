const UserService = require('../services/user.service');
const {controllerError, controllerSuccess} = require('../helper/controller.helper');
const {userDto, usersPaginationDto} = require("../dto/user.dto");
const bcrypt = require("bcryptjs");

class UserController {
    static model = 'user';
    static userService = new UserService(this.model, {
            include: {
                Profile: true,
                UserAccess: {
                    include: {
                        Access: true
                    }
                }
            },
        },
        null,
        [
            'email',
            [
                {
                    Profile: [
                        'firstName',
                        'lastName',
                        'patronymicName',
                    ]
                }
            ]
        ]
    );

    /*** Private functions ***/
    static #getPaginationParams(query) {
        const {page = 1, limit = 2} = query;
        return {page, limit}
    }

    /*** Private functions ***/

    static get = async (req, res) => {
        try {
            const data = await this.userService.get(req.params.id);
            return controllerSuccess(res, 'get', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static all = async (req, res) => {
        try {
            const {page, limit} = this.#getPaginationParams(req.query);
            delete req.query?.page;
            delete req.query?.limit;
            // get
            let query = {...req.query};
            const data = await this.userService.all({page, limit}, query);
            // get all records
            query = {...req.query};
            const dataAll = await this.userService.all({}, query);

            return controllerSuccess(res, 'all', this.model, data.id, usersPaginationDto(data, page, limit, dataAll));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static create = async (req, res) => {
        try {
            let data = req.body;
            const user = {
                email: data.email,
                password: bcrypt.hashSync(data.password, 8),
                Profile: {
                    create: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        patronymicName: data.patronymicName,
                        dateOfBirth: data.dateOfBirth,
                    }
                },
                UserAccess: {
                    create: {
                        accessId: data.accessId
                    }
                }
            }
            data = await this.userService.create(user, req.user.payload);
            return controllerSuccess(res, 'create', this.model, null, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static update = async (req, res) => {
        try {
            let data = req.body;
            const user = {
                email: data.email,
                // password: bcrypt.hashSync(data.password, 8),
                Profile: {
                    update: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        patronymicName: data.patronymicName,
                        dateOfBirth: data.dateOfBirth,
                    }
                },
                UserAccess: {
                    update: {
                        accessId: data.accessId
                    }
                }
            }
            data = await this.userService.update(req.params.id, user, req.user.payload);
            return controllerSuccess(res, 'update', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static isBlockedUpdate = async (req, res) => {
        try {
            let data = req.body;
            data = await this.userService.update(req.params.id, data, req?.user?.payload);
            return controllerSuccess(res, 'update', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static resetPassword = async (req, res) => {
        try {
            const data = await this.userService.resetPassword(req.params.id, req.body.password, req.user.payload);
            return controllerSuccess(res, 'resetPassword', this.model, data.id, null);
        } catch (e) {
            controllerError(res, e);
        }
    }
    static delete = async (req, res) => {
        try {
            const data = await this.userService.delete(req.params.id, req.user.payload);
            return controllerSuccess(res, 'delete', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
    static restore = async (req, res) => {
        try {
            const data = await this.userService.restore(req.params.id, req.user.payload);
            return controllerSuccess(res, 'restore', this.model, data.id, userDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = UserController;
