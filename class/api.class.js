const prisma = require("../utils/prisma");
const createError = require("http-errors");
const message = require('../helper/message');

class ApiClass {
    constructor(model, args = {}, isDeleted = true) {
        this.model = model;
        this.args = {
            where: {
                ...args.where,
                ...isDeleted ? {deletedAt: null} : {},
            },
            ...args.include ? {include: {...args.include}} : {},
            ...args.orderBy ? {orderBy: {...args.orderBy}} : {orderBy: {id: 'asc'}},
        };
    }

    async get(key) {
        const query = this.#checkIdOrSlug(key);
        const record = await prisma[this.model].findFirst({
            ...this.args,
            where: {
                ...query,
                ...this.args.where,
            }
        });

        if (!record) {
            throw createError(404, `${message[this.model](key)['404']}`);
        }

        return record;
    }

    async all(pagination = {}) {
        return await prisma[this.model].findMany({
            ...this.args,
            ...pagination,
        });
    }

    async create(data, user) {
        return await prisma[this.model].create({
            data: {
                ...data,
                user
            }
        });
    }

    async update(key, data, user) {
        const query = this.#checkIdOrSlug(key);
        await this.#isExistence(key);
        return await prisma[this.model].update(
            {
                where: {...query},
                data: {
                    ...data,
                    user
                }
            }
        );
    }

    async delete(key, user) {
        const data = {deletedAt: new Date()};
        return await this.update(key, data, user);
    }

    async restore(key, user) {
        const query = this.#checkIdOrSlug(key);
        await this.#isExistence(key, false);
        return await prisma[this.model].update(
            {
                where: {...query},
                data: {
                    deletedAt: null,
                    user
                }
            }
        );
    }

    #checkIdOrSlug = key => !isNaN(Number(key)) ? {id: Number(key)} : {slug: key};

    async #isExistence(key, checkDelete = true) {
        const query = this.#checkIdOrSlug(key);
        let record = await prisma[this.model].findFirst({
            where: {
                ...query,
                ...checkDelete ? this.args.where : {}
            },
        });
        if (!record) {
            throw createError(404, `${message[this.model](key)['404']}`)
        }
    }
}

module.exports = ApiClass;
