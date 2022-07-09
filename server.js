const express = require('express');
const server = express();
const port = process.env.PORT || 5000;
server.use(express.static('public'));
server.get('*', (req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World');
});
server.listen(port, () =>
    console.log(`Server is running on: http://localhost:${port}`));

