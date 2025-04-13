const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const productController = require('../controllers/product')

router.post('/create', [verifyAccessToken, isAdmin], productController.createProduct)
router.get('/all', productController.getAllProduct)

router.put('/ratings', verifyAccessToken, productController.ratings)


router.put('/:pid', productController.updateProduct)
router.delete('/:pid', productController.deleteProduct)
router.get('/:pid', productController.getProduct)

module.exports = router