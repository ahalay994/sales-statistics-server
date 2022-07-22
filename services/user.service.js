const prisma = require('../utils/prisma');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
// const {getApi, allApi} = require("../api");

class UserService {
    static model = 'user'

    static async get(id) {
        const where = {
            isBlocked: false,
        }
        const include = {
            include: {
                UserAccess: {
                    include: {
                        Access: true,
                    },
                },
                Profile: true
            }
        }
        return await getApi(id, this.model, include, where);
    }

    static async all() {
        const where = {
            isBlocked: false,
        }
        const include = {
            include: {
                UserAccess: {
                    include: {
                        Access: true,
                    },
                },
                Profile: true
            }
        }
        // return await allApi(this.model, include, where,true, null);
    }

    static async create(req) {
        const data = req.body;
        let user = await prisma.user.findUnique({
            where: {
                email: data.email
            },
        });
        if (user) {
            throw createError(400, 'Данная электронная почта занята');
        }
        data.password = bcrypt.hashSync(data.password, 8);
        let profile = {};
        if (req?.query?.isProfile) {
            profile = {
                Profile: {
                    create: {
                        firstName: data.firstName,
                        lastName: data.lastName,
                        patronymicName: data.patronymicName,
                        dateOfBirth: data.dateOfBirth,
                    }
                }
            };
        }
        let access = {};
        if (req?.query?.isAccess) {
            access = {
                UserAccess: {
                    create: {
                        accessId: data.accessId
                    }
                }
            }
        }
        user = {
            email: data.email,
            password: data.password,
            ...profile,
            ...access
        }
        return prisma.user.create({
            data: user
        });
    }

    static async update(id, req) {
        const data = req.body;
        let user = await prisma.user.findUnique({
            where: { id },
        });
        if (!user) {
            throw createError(400, 'Пользователь не найден')
        }
        if (user.email === data.email) {
            throw createError(400, 'Данная электронная почта занята')
        }
        user = {
            email: data.email,
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
        return prisma.user.update({
            data: user
        });
    }

    static async resetPassword(password, id = null) {
        let user = await prisma.user.findUnique({
            where: { id }
        });

        if (!user) throw createError(404, 'Пользователь не зарегистрирован')

        return prisma.user.update(
            {
                where: { id },
                data: {
                    password: bcrypt.hashSync(password, 8),
                }
            }
        );
    }

    static async delete(id) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw createError(404, 'Пользователь не найден')
        }
        await prisma.user.update({
            where: { id },
            data: { deletedAt: new Date() }
        })
    }

    static async restore(id) {
        const user = await prisma.user.findUnique({
            where: {
                id
            }
        });
        if (!user) {
            throw createError(404, 'Пользователь не найден')
        }
        await prisma.user.update({
            where: { id },
            data: { deletedAt: null }
        })
    }

}

module.exports = UserService;
