const prisma = require('../utils/prisma');
const createError = require('http-errors');
const {getApi, allApi, createApi, updateApi, deleteOrRestore} = require("../api");

class CategoryService {
    static model = 'category'

    static async get(key) {
        const include = {
            include: {
                childrenCategory: true
            }
        }
        return await getApi(key, this.model, include);
    }

    static async all() {
        const include = {
            include: {
                childrenCategory: true
            }
        }
        return await allApi(this.model, include, true, null);
    }

    static async create(data, user) {
        data = {
            data: {
                ...data,
                parentId: data.parentId || null,
            }
        }
        return await createApi(data, this.model, user);
    }

    static async update(key, data, user) {
        return await updateApi(key, data, this.model, true, user);
    }

    static async delete(key, user) {
        return await deleteOrRestore(key, this.model, true, user);
    }

    static async restore(key, user) {
        return await deleteOrRestore(key, this.model, false, user);
    }
}

module.exports = CategoryService;
