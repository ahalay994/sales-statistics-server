const user = (id = null) => {
    return {
        'get': `Пользователь #${id}`,
        'all': `Все пользователи`,
        'create': `Пользователь создан`,
        'update': `Пользователь #${id} обновлён`,
        'delete': `Пользователь #${id} удалён`,
        'restore': `Пользователь #${id} восстановлен`,
        'resetPassword': `Пароль пользователя #${id} обновлён`,
        '404': `Пользователь #${id} не найден`,
        '400': `Пользователь уже существует`,
    }
}

module.exports = user;
