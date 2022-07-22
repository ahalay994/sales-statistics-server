const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
// register
router.post('/', authController.register);
// login
router.post('/login', authController.login);
module.exports = router;
