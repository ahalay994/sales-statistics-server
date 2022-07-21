const prisma = require('../utils/prisma');

const allApi = async (model, include = {}, checkDeleted = true, pagination) => {
    const { page, limit } = pagination;
    const deleteAt = checkDeleted ? {deletedAt: null} : {}

    return await prisma[model].findMany({
        skip: (page - 1) * limit,
        take: limit,
        where: {
            ...deleteAt,
        },
        ...include,
        orderBy: {
            id: 'asc',
        },
    });
}

module.exports = allApi;
