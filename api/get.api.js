const prisma = require('../utils/prisma');
const createError = require("http-errors");

const message = model => {
    switch (model) {
        case 'user':
            return 'Пользователь не найден';
        case 'category':
            return 'Категория не найдена';
        case 'product':
            return 'Товар не найден';
        default:
            return 'Объект не найден';
    }
}

const getApi = async (key, model, include = {}, checkDeleted = true) => {
    // Определяем пришло id или slug
    const query = !isNaN(Number(key)) ? { id: Number(key) } : { slug: key };
    const deleteAt = checkDeleted ? {deletedAt: null} : {}

    const record = await prisma[model].findFirst({
        where: {
            ...query,
            ...deleteAt
        },
        ...include
    });
    if (!record) {
        throw createError(404, `${message(model)}`);
    }

    return record;
}

module.exports = getApi;
