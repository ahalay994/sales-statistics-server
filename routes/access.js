const router = require('express').Router();
const accessController = require('../controllers/access.controller');
const auth = require('../middlewares/auth');
router.get('/', accessController.all);
router.get('/:key', accessController.get);

module.exports = router;
