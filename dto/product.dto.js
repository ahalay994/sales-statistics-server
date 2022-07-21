const {paginationDto} = require('./global.dto');

const productDto = (product) => ({
    /** @type {number} */
    id: product.id,
    /** @type {string} */
    name: product.name,
    /** @type {string} */
    slug: product.slug,
    /** @type {string} */
    description: product.description,
    /** @type {string} */
    image: product.image,
});

const productsDto = (products) => ({
    data: products.map(productDto),
}).data;

const productsPaginationDto = (products, page, limit) => ({
    data: productsDto(products),
    pagination: paginationDto(page, limit, products.length)
});

module.exports = {
    productDto,
    productsDto,
    productsPaginationDto,
}
