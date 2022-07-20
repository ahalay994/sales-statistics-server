const helper = require("../helper");
const profileDto = (profile) => ({
    /** @type {string} */
    firstName: profile.firstName,
    /** @type {string} */
    lastName: profile.lastName,
    /** @type {string} */
    patronymicName: profile.patronymicName,
    /** @type {string} */
    dateOfBirth: helper.formatDate(profile.dateOfBirth),
});


module.exports = {
    profileDto
}
