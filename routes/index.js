const express = require('express');
const router = express.Router();
const auth = require('./auth');
const user = require('./user');
const category = require('./category');
const createError = require('http-errors')

router.get('/', (req, res) => res.send('Hello World!'));
/*** Auth ***/
router.use('/auth', auth);
/*** User ***/
router.use('/user', user);
/*** Category ***/
router.use('/category', category);

/*** Route not Found ***/
router.use(async (req, res, next) => {
    next(createError.NotFound('Route not Found'))
});
/*** Error ***/
router.use( (err, req, res, next) => {
    res.status(err.status || 500).json({
        status: false,
        message: err.message
    })
});

module.exports = router;
