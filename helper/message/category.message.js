const category = (id = null) => {
    return {
        'get': `Категория #${id}`,
        'all': `Все категории`,
        'create': `Категория создана`,
        'update': `Категория #${id} обновлена`,
        'delete': `Категория #${id} удалена`,
        'restore': `Категория #${id} восстановлена`,
    }
}

module.exports = category;
