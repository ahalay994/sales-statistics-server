const prisma = require('../utils/prisma');
const createError = require('http-errors');
require('dotenv').config();
const bcrypt = require('bcryptjs');
const ApiClass = require('../class/api.class');

class UserService extends ApiClass {
    static model = 'user';

    async resetPassword(id, password, user) {
        let data = await prisma[this.model].findUnique({
            where: { id }
        });

        if (!data) throw createError(404, 'Пользователь не зарегистрирован')

        return prisma[this.model].update(
            {
                where: { id },
                data: {
                    password: bcrypt.hashSync(password, 8),
                    user
                }
            }
        );
    }
}

module.exports = UserService;
