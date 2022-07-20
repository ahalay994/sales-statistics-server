checkChildCategories = category => category ? { categoryChildren: categoriesDto(category) } : {}

const categoryDto = (category) => ({
    /** @type {number} */
    id: category.id,
    /** @type {string} */
    name: category.name,
    /** @type {string} */
    slug: category.slug,
    /** @type [categoryDto] */
    ...checkChildCategories(category.childrenCategory),
});

const categoriesDto = (categories) => ({
    data: categories.map(categoryDto),
}).data;


module.exports = {
    categoryDto,
    categoriesDto,
}
