const updateApi = require('./update.api');

const deleteOrRestoreApi = async (key, model, isDelete, user) => {
    const data = { deletedAt: isDelete ? new Date() : null };
    return await updateApi(key, data, model, isDelete, user);
}

module.exports = deleteOrRestoreApi;
