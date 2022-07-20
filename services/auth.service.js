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
            throw createError.Registered('User registered')
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
            },
        });
        if (!user) {
            throw createError.NotFound('Пользователь не зарегистрирован')
        }
        const checkPassword = bcrypt.compareSync(password, user.password)
        if (!checkPassword) throw createError.Unauthorized('Пароль неверный')
        delete user.password
        const accessToken = await jwt.signAccessToken(user)
        return { ...user, accessToken }
    }

    static async user(data) {
        const { email } = data;
        try {
            const user = await prisma.user.findUnique({
                where: {
                    email
                },
                include: {
                    profile: true,
                    UserAccess: {
                        include: {
                            access: true
                        }
                    }
                },
            });
            if (!user) {
                throw createError.NotFound('Пользователь не зарегистрирован')
            }
            return {...user}
        } catch (e) {
            console.dir(e);
        }
        return {};
    }

    static async all() {
        return await prisma.user.findMany();
    }

}

module.exports = AuthService;
