const {profileDto} = require("./profile.dto");
const {accessDto} = require("./access.dto");
const {userAccessDto} = require("./userAccess.dto");
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


module.exports = {
    userDto,
    usersDto,
}
