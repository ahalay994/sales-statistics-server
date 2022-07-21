const prisma = require('../utils/prisma');
const createError = require("http-errors");

const message = model => {
    switch (model) {
        case 'user':
            return 'Пользователь существует';
        case 'category':
            return 'Категория существует';
        case 'product':
            return 'Товар существует';
        default:
            return 'Объект существует';
    }
}

const createApi = async (data, model, user) => {
    if (data.name) {
        const record = await prisma[model].findFirst({
            where: {
                name: {
                    mode: 'insensitive',
                    contains: data.name,
                },
            },
        });
        if (record) {
            throw createError(400, `${message(model)}`)
        }
    }

    return await prisma[model].create({
        data: {
            ...data,
            user
        }
    });
}

module.exports = createApi;
