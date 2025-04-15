const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const productController = require('../controllers/product')
const uploader = require('../configs/cloudinary.config')
router.post('/create', [verifyAccessToken, isAdmin], productController.createProduct)
router.get('/all', productController.getAllProduct)

router.put('/ratings', verifyAccessToken, productController.ratings)


router.put('/:pid', [verifyAccessToken, isAdmin], productController.updateProduct)
router.put('/upload-image/:pid', [verifyAccessToken, isAdmin], uploader.array('images', 10), productController.uploadImagesProduct)
router.delete('/:pid', [verifyAccessToken, isAdmin], productController.deleteProduct)
router.get('/:pid', productController.getProduct)

module.exports = router