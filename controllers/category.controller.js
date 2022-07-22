const CategoryService = require('../services/category.service');
const {controllerError, controllerSuccess} = require("../helper/controller.helper");
const { categoryDto, categoriesDto } = require("../dto/category.dto");

class CategoryController {
    static model = 'category';
    static categoryService = new CategoryService(this.model, {include: { childrenCategory: true }});

    static get = async (req, res) => {
        try {
            const data = await this.categoryService.get(req.params.key);
            return controllerSuccess(res, 'get', this.model, data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static all = async (req, res) => {
        try {
            const data = await this.categoryService.all();
            return controllerSuccess(res, 'all', this.model, data.id, categoriesDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static create = async (req, res) => {
        try {
            const data = await this.categoryService.create(req.body, req.user.payload);
            return controllerSuccess(res, 'create', this.model, null, categoryDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }

    static update = async (req, res) => {
        try {
            const data = await this.categoryService.update(req.params.key, req.body, req.user.payload);
            return controllerSuccess(res, 'update', this.model, data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await this.categoryService.delete(req.params.key, req.user.payload);
            return controllerSuccess(res, 'delete', this.model, data.id);
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static restore = async (req, res) => {
        try {
            const data = await this.categoryService.restore(req.params.key, req.user.payload);
            return controllerSuccess(res, 'restore', this.model, data.id, categoryDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = CategoryController;
