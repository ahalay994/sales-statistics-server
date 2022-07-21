const product = (id = null) => {
    return {
        'get': `Товар #${id}`,
        'all': `Все товары`,
        'create': `Товар создан`,
        'update': `Товар #${id} обновлён`,
        'delete': `Товар #${id} удалён`,
        'restore': `Товар #${id} восстановлен`,
    }
}
module.exports = product;
