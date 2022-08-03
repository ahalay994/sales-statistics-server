const paginationDto = (page, limit, count) => {
    return {
        page: +page,
        limit: +limit,
        totalCount: count,
        pageCount: Math.ceil(count / limit),
    }
};

module.exports = {
    paginationDto,
}
