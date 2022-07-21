const router = require('express').Router();
const productController = require('../controllers/product.controller');
const auth = require('../middlewares/auth');
router.get('/', productController.all);
router.get('/:key', productController.get);
router.post('/', auth, productController.create);
router.put('/:key', auth, productController.update);
router.delete('/:key', auth, productController.delete);
router.patch('/:key', auth, productController.restore);
module.exports = router;