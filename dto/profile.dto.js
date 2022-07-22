const helper = require("../helper");
const profileDto = (profile) => ({
    /** @type {string} */
    firstName: profile?.firstName || null,
    /** @type {string} */
    lastName: profile?.lastName || null,
    /** @type {string} */
    patronymicName: profile?.patronymicName || null,
    /** @type {string} */
    dateOfBirth: profile?.dateOfBirth ? helper.formatDate(profile.dateOfBirth) : null,
});


module.exports = {
    profileDto
}
