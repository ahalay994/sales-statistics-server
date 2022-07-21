const productService = require('../services/product.service');
const {controllerError, controllerSuccess} = require("../helper/controller.helper");
const {productDto, productsPaginationDto} = require("../dto/product.dto");

class ProductController {
    static get = async (req, res) => {
        try {
            const data = await productService.get(req.params.key);
            return controllerSuccess(res, 'get', 'product', data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static all = async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const data = await productService.all(page, limit);
            return controllerSuccess(res, 'all', 'product', null, productsPaginationDto(data, page, limit));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static create = async (req, res) => {
        try {
            const data = await productService.create(req.body, req.user.payload);
            return controllerSuccess(res, 'create', 'product', data.id, productDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }

    static update = async (req, res) => {
        try {
            const data = await productService.update(req.params.key, req.body, req.user.payload);
            return controllerSuccess(res, 'update', 'product', data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await productService.delete(req.params.key, req.user.payload);
            return controllerSuccess(res, 'delete', 'product', data.id);
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static restore = async (req, res) => {
        try {
            const data = await productService.restore(Number(req.params.key), req.user.payload);
            return controllerSuccess(res, 'restore', 'product', data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = ProductController;
