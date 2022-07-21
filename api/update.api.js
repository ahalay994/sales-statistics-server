const prisma = require('../utils/prisma');
const createError = require("http-errors");

const message = model => {
    switch (model) {
        case 'user':
            return 'Пользователь не существует';
        case 'category':
            return 'Категория не существует';
        case 'product':
            return 'Товар не существует';
        default:
            return 'Объект не существует';
    }
}

const updateApi = async (key, data, model, checkDeleted = true, user) => {
    const query = !isNaN(Number(key)) ? { id: Number(key) } : { slug: key };
    const deleteAt = checkDeleted ? {deletedAt: null} : {}
    let record = await prisma[model].findFirst({
        where: {
            ...query,
            ...deleteAt,
        },
    });
    if (!record) {
        throw createError(404, `${message(model)}`)
    }
    return await prisma[model].update(
        {
            where: { ...query },
            data: {
                ...data,
                user
            }
        }
    );
}

module.exports = updateApi;
