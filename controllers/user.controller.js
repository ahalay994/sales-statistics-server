const userService = require('../services/user.service');
const {controllerError} = require('../helper/controller.helper');
const { userDto, usersDto } = require("../dto/user.dto");

class UserController {
    static get = async (req, res) => {
        try {
            const data = await userService.get(Number(req.params.id));
            res.status(200).json({
                status: true,
                message: `Пользователь #${data.id}`,
                data: userDto(data)
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static all = async (req, res) => {
        try {
            const data = await userService.all();
            res.status(200).json({
                status: true,
                message: 'Все пользователи',
                data: usersDto(data)
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static create = async (req, res) => {
        try {
            const data = await userService.create(req);
            res.status(200).json({
                status: true,
                message: `Пользователь создан`,
                data: userDto(data)
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static update = async (req, res) => {
        try {
            const data = await userService.create(Number(req.params.id), req);
            res.status(200).json({
                status: true,
                message: `Данные пользователя #${data.id} обновлены`,
                data: userDto(data)
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static resetPassword = async (req, res) => {
        try {
            const id = req?.params?.id ? Number(req?.params?.id) : Number(req.user.payload.id);
            await userService.resetPassword(req.body.password, id);
            res.status(200).json({
                status: true,
                message: `Пароль пользователя #${data.id} обновлён`
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static delete = async (req, res) => {
        try {
            const data = await userService.delete(Number(req.params.id));
            res.status(200).json({
                status: true,
                message: `Пользователь #${data.id} удалён`,
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
    static restore = async (req, res) => {
        try {
            const data = await userService.restore(Number(req.params.id));
            res.status(200).json({
                status: true,
                message: `Пользователь #${data.id} восстановлен`,
                data: userDto(data)
            });
        } catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = UserController;
