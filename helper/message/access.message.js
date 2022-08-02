const access = (key = null) => {
    return {
        'get': `Доступ #${key}`,
        'all': `Все доступы`,
        'create': `Доступ создан`,
        'update': `Доступ #${key} обновлён`,
    }
}

module.exports = access;
