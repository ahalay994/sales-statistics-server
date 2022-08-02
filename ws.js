const WebSocket = require('ws');
const CategoryService = require("./services/category.service");
const wsServer = new WebSocket.Server({port: 9000});
const model = 'category';
const categoryService = new CategoryService(model, {include: { childrenCategory: true }});

onConnect = (wsClient) => {
    wsClient.send('Привет');
    wsClient.on('message', async (message)  => {
        try {
            const jsonMessage = JSON.parse(message);
            switch (jsonMessage.action) {
                case 'ECHO':
                    wsClient.send(jsonMessage.data);
                    break;
                case 'PING':
                    const data = await categoryService.all();
                    wsClient.send(JSON.stringify(data));
                    break;
                default:
                    console.log('Неизвестная команда');
                    break;
            }
        } catch (error) {
            console.log('Ошибка', error);
        }

    });
    wsClient.on('close', function() {
        console.log('Пользователь отключился');
    });
}

wsServer.on('connection', onConnect);
