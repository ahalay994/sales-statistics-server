require('@prisma/client');
require('dotenv').config();
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const multer = require('multer');
const route = require('./routes');

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use('/', route);

const port = process.env.PORT || 5000;
app.listen(port, () => {
    console.log(`server is running  http://localhost:${port}`);
});
