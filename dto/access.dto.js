const {paginationDto} = require("./global.dto");
const accessDto = (access) => ({
    /** @type {number} */
    id: access.id,
    /** @type {string} */
    slug: access.slug,
    /** @type {string} */
    name: access.name,
});

const accessesDto = (access) => ({
    data: access.map(accessDto),
}).data;

const accessesPaginationDto = (accesses, page, limit, accessesAll) => ({
    data: accessesDto(accesses),
    pagination: paginationDto(page, limit, accessesAll.length)
});

module.exports = {
    accessDto,
    accessesDto,
    accessesPaginationDto,
}
