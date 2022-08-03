const {PrismaClient} = require('@prisma/client');
const prisma = new PrismaClient();
const slugify = require("slugify");
const ip = require("ip");


prisma.$use(async (params, next) => {
    let {args: {data}} = params;
    if ((params.action === 'create' || params.action === 'update') && ['Category', 'Product'].includes(params.model)) {
        if (!!data.name) {
            data.slug = slugify(`${data.name}`, {lower: true, strict: true, remove: /[*+~.()'"!:@]/g});
        }
    }
    let userId = null;
    if (data?.user) {
        userId = data.user.id;
        delete data.user;
    }

    const result = await next(params);
    // Записываем изменения в логи
    if ((params.action === 'create' || params.action === 'update' || params.action === 'delete') && !['Log'].includes(params.model)) {
        await prisma.log.create({
            data: {
                model: params.model,
                modelId: result.id,
                action: !!data.deletedAt ? 'delete' : (data?.deletedAt === null ? 'restore' : params.action),
                userId,
                ip: ip.address(),
            }
        });
    }

    return result;
});

module.exports = prisma;
