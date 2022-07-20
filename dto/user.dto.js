const {profileDto} = require("./profile.dto");
const userDto = (user) => ({
    /** @type {number} */
    id: user.id,
    /** @type {string} */
    email: user.email,
    /** @type {boolean} */
    isBlocked: user.isBlocked,
    /** @type {string} */
    access: user.UserAccess.Access.name,
    /** @type {boolean} */
    isAdmin: user.UserAccess.Access.slug === 'admin',
    /** @type {profileDto} */
    profile: profileDto(user.Profile)
});

const usersDto = (users) => ({
    data: users.map(userDto),
}).data;


module.exports = {
    userDto,
    usersDto,
}
