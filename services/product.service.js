const { allApi, getApi, createApi, updateApi, deleteOrRestore } = require('../api');

class CategoryService {
    static model = 'product';

    static async get(key) {
        return await getApi(key, this.model);
    }

    static async all(page, limit) {
        return await allApi(this.model, {}, true, {page, limit})
    }

    static async create(data, user) {
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
