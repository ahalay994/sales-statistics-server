const auth = require('../services/auth.service');
const createError = require('http-errors');

class AuthController {
    static register = async (req, res, next) => {
        try {
            const user = await auth.register(req.body);
            delete user.password;
            res.status(200).json({
                status: true,
                message: 'User created successfully',
                data: user
            })
        }
        catch (e) {
            console.dir(e)
            next()
        }
    }
    static login = async (req, res, next) => {
        try {
            let data = await auth.login(req.body);
            data = {
                email: data.email,
                firstName: data.Profile.firstName,
                lastName: data.Profile.lastName,
                patronymicName: data.Profile.patronymicName,
                dateOfBirth: data.Profile.dateOfBirth,
                accessToken: data.accessToken
            };
            res.status(200).json({
                status: true,
                message: "Вы успешно вошли в систему",
                data
            })
        } catch (e) {
            console.dir(e);
            next()
        }
    }
    static user = async (req, res, next) => {
        try {
            let data = await auth.user(req.user.payload)
            data = {
                email: data.email,
                firstName: data.profile.firstName,
                lastName: data.profile.lastName,
                patronymicName: data.profile.patronymicName,
                dateOfBirth: data.profile.dateOfBirth,
                isAdmin: data.UserAccess.Access.slug === 'admin'
            };
            res.status(200).json({
                status: true,
                message: "Пользователь найден",
                data
            })
        } catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
    static all = async (req, res, next) => {
        try {
            const users = await auth.all();
            res.status(200).json({
                status: true,
                message: 'All users',
                data: users
            })
        }
        catch (e) {
            next(createError(e.statusCode, e.message))
        }
    }
}
module.exports = AuthController;
