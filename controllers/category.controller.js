const categoryService = require('../services/category.service');
const errors = require("../helper/errors");
const { categoryDto, categoriesDto } = require("../dto/category.dto");

class CategoryController {
    static get = async (req, res) => {
        try {
            const data = await categoryService.get(Number(req.params.id));
            res.status(200).json({
                status: true,
                message: `Категория #${req.params.id}`,
                data: categoryDto(data)
            });
        }
        catch (e) {
            errors.controllerError(res, e);
        }
    }

    static all = async (req, res) => {
        try {
            const data = await categoryService.all();
            res.status(200).json({
                status: true,
                message: 'Все категории',
                data: categoriesDto(data)
            });
        }
        catch (e) {
            errors.controllerError(res, e);
        }
    }

    static create = async (req, res) => {
        try {
            const data = await categoryService.create(req.body, req.user.payload);
            res.status(200).json({
                status: true,
                message: `Категория создана`,
                data: categoryDto(data)
            });
        } catch (e) {
            errors.controllerError(res, e);
        }
    }

    static update = async (req, res) => {
        try {
            const data = await categoryService.update(Number(req.params.id), req.body, req.user.payload);
            res.status(200).json({
                status: true,
                message: `Категория #${req.params.id} обновлена`,
                data: categoryDto(data)
            });
        }
        catch (e) {
            errors.controllerError(res, e);
        }
    }

    static delete = async (req, res) => {
        try {
            await categoryService.delete(Number(req.params.id), req.user.payload);
            res.status(200).json({
                status: true,
                message: `Категория #${req.params.id} удалена`
            });
        }
        catch (e) {
            errors.controllerError(res, e);
        }
    }

    static restore = async (req, res) => {
        try {
            const data = await categoryService.restore(Number(req.params.id), req.user.payload);
            res.status(200).json({
                status: true,
                message: `Категория #${req.params.id} восстановлена`,
                data: categoryDto(data)
            });
        }
        catch (e) {
            errors.controllerError(res, e);
        }
    }
}

module.exports = CategoryController;
