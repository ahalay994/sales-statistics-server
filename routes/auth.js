const router = require('express').Router();
const authController = require('../controllers/auth.controller');
const auth = require('../middlewares/auth');
// register
router.post('/', authController.register);
// login
router.post('/login', authController.login);
// get user data
router.post('/user', auth, authController.user);
// all users
router.get('/', auth, authController.all);
module.exports = router;
