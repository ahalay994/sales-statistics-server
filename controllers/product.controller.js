const ProductService = require('../services/product.service');
const {controllerError, controllerSuccess} = require("../helper/controller.helper");
const {productDto, productsPaginationDto} = require("../dto/product.dto");

class ProductController {
    static model = 'product';
    static productService = new ProductService(this.model);

    static get = async (req, res) => {
        try {
            const data = await this.productService.get(req.params.key);
            return controllerSuccess(res, 'get', this.model, data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static all = async (req, res) => {
        try {
            const { page = 1, limit = 10 } = req.query;
            const data = await this.productService.all(page, limit);
            return controllerSuccess(res, 'all', this.model, null, productsPaginationDto(data, page, limit));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static create = async (req, res) => {
        try {
            const data = await this.productService.create(req.body, req.user.payload);
            return controllerSuccess(res, 'create', this.model, data.id, productDto(data));
        } catch (e) {
            controllerError(res, e);
        }
    }

    static update = async (req, res) => {
        try {
            const data = await this.productService.update(req.params.key, req.body, req.user.payload);
            return controllerSuccess(res, 'update', this.model, data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static delete = async (req, res) => {
        try {
            const data = await this.productService.delete(req.params.key, req.user.payload);
            return controllerSuccess(res, 'delete', this.model, data.id);
        }
        catch (e) {
            controllerError(res, e);
        }
    }

    static restore = async (req, res) => {
        try {
            const data = await this.productService.restore(Number(req.params.key), req.user.payload);
            return controllerSuccess(res, 'restore', this.model, data.id, productDto(data));
        }
        catch (e) {
            controllerError(res, e);
        }
    }
}

module.exports = ProductController;
