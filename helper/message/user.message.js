const user = (id = null) => {
    return {
        'get': `Пользователь #${id}`,
        'all': `Все пользователи`,
        'create': `Пользователь создан`,
        'update': `Пользователь #${id} обновлён`,
        'delete': `Пользователь #${id} удалён`,
        'restore': `Пользователь #${id} восстановлен`,
    }
}

module.exports = user;
