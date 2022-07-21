const categoryService = require('../services/category.service');
const {controllerError, controllerSuccess} = require("../helper/controller.helper");
const { categoryDto, categoriesDto } = require("../dto/category.dto");

class CategoryController {
    static get = async (req, res) => {
        try {
            const data = await categoryService.get(req.params.key);
            return controllerSuccess(res, 'get', 'category', data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static all = async (req, res) => {
        try {
            const data = await categoryService.all();
            return controllerSuccess(res, 'all', 'category', data.id, categoriesDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static create = async (req, res) => {
        try {
            const data = await categoryService.create(req.body, req.user.payload);
            return controllerSuccess(res, 'create', 'category', null, categoryDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }

    static update = async (req, res) => {
        try {
            const data = await categoryService.update(req.params.key, req.body, req.user.payload);
            return controllerSuccess(res, 'update', 'category', data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await categoryService.delete(req.params.key, req.user.payload);
            return controllerSuccess(res, 'delete', 'category', data.id);
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static restore = async (req, res) => {
        try {
            const data = await categoryService.restore(req.params.key, req.user.payload);
            return controllerSuccess(res, 'restore', 'category', data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = CategoryController;
