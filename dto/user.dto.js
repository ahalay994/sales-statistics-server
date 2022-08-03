const {profileDto} = require("./profile.dto");
const {userAccessDto} = require("./userAccess.dto");
const {paginationDto} = require("./global.dto");
const userDto = (user) => ({
    /** @type {number} */
    id: user.id,
    /** @type {string} */
    email: user.email,
    /** @type {boolean} */
    isBlocked: user.isBlocked,
    /** @type {string} */
    access: user.UserAccess?.Access?.name,
    /** @type {boolean} */
    isAdmin: user.UserAccess?.Access?.slug === 'admin',
    /** @type string */
    accessToken: user.accessToken || undefined,
    /** @type {profileDto} */
    Profile: user.Profile ? profileDto(user.Profile) : undefined,
    /** @type {userAccessDto} */
    UserAccess: user.UserAccess ? userAccessDto(user.UserAccess) : undefined,
});

const usersDto = (users) => ({
    data: users.map(userDto),
}).data;

const usersPaginationDto = (users, page, limit, usersAll) => ({
    data: usersDto(users),
    pagination: paginationDto(page, limit, usersAll.length)
});

module.exports = {
    userDto,
    usersDto,
    usersPaginationDto,
}
