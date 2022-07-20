const prisma = require('../utils/prisma');
const createError = require('http-errors');

class CategoryService {
    static async get(id) {
        const record = await prisma.category.findFirst({
            where: {
                id,
                deletedAt: null,
            },
            include: {
                childrenCategory: true
            }
        });
        if (!record) {
            throw createError(404, 'Категория не найдена');
        }
        return record;
    }

    static async all() {
        return await prisma.category.findMany({
            where: {
                deletedAt: null,
                parentId: null,
            },
            include: {
                childrenCategory: true
            }
        });
    }

    static async create(data, user) {
        let record = await prisma.category.findFirst({
            where: {
                name: {
                    mode: 'insensitive',
                    contains: data.name,
                },
            },
        });
        if (record) {
            throw createError(400, 'Данная категория существует!')
        }

        return prisma.category.create({
            data: {
                name: data.name,
                parentId: data.parentId || null,
                user
            }
        });
    }

    static async update(id, data, user) {
        let record = await prisma.category.findUnique({
            where: {
                id
            },
        });
        if (!record) {
            throw createError(404, 'Данная категория отсутствует!')
        }
        return prisma.category.update(
            {
                where: { id },
                data: {
                    name: data.name || record.name,
                    parentId: data.parentId || record.parentId,
                    user
                }
            }
        );
    }

    static async delete(id, user) {
        let record = await prisma.category.findUnique({
            where: {
                id
            },
        });
        if (!record) {
            throw createError(404, 'Данная категория отсутствует!')
        }
        return prisma.category.update(
            {
                where: { id },
                data: {
                    deletedAt: new Date(),
                    user
                }
            }
        );
    }

    static async restore(id, user) {
        let record = await prisma.category.findUnique({
            where: {
                id
            },
        });
        if (!record) {
            throw createError(404, 'Данная категория отсутствует!')
        }
        return prisma.category.update(
            {
                where: { id },
                data: {
                    deletedAt: null,
                    user
                }
            }
        );
    }
}

module.exports = CategoryService;
