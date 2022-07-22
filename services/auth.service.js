const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const createError = require('http-errors');

require('dotenv').config();
const bcrypt = require('bcryptjs');
const jwt = require('../utils/jwt');

class AuthService {
    static async register(data) {
        const { email } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (user) {
            throw createError(400, 'Пользователь с таким email уже существует')
        }
        data.password = bcrypt.hashSync(data.password, 8);
        return prisma.user.create({
            data
        });
    }

    static async login(data) {
        const { email, password } = data;
        const user = await prisma.user.findUnique({
            where: {
                email
            },
            include: {
                Profile: true,
                UserAccess: {
                    include: {
                        Access: true
                    }
                }
            },
        });
        if (!user) {
            throw createError(404, 'Пользователь не зарегистрирован')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError(400, 'Пароль неверный')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }
}

module.exports = AuthService;
