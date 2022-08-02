const userAccessDto = (userAccess) => ({
    /** @type {number} */
    userId: userAccess.userId,
    /** @type {number} */
    accessId: userAccess.accessId,
});


module.exports = {
    userAccessDto,
}
