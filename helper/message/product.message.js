const product = (id = null) => {
    return {
        'get': `Товар #${id}`,
        'all': `Все товары`,
        'create': `Товар создан`,
        'update': `Товар #${id} обновлён`,
        'delete': `Товар #${id} удалён`,
        'restore': `Товар #${id} восстановлен`,
        '404': `Товар #${id} не найден`,
        '400': `Товар уже существует`,
    }
}
module.exports = product;
