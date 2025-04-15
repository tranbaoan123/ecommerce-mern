const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const orderController = require('../controllers/order')
const uploader = require('../configs/cloudinary.config')
router.post('/create', [verifyAccessToken], orderController.createOrder)
router.put('/status/:oid', [verifyAccessToken, isAdmin], orderController.updateOrderStatus)
router.get('/', [verifyAccessToken], orderController.getOrderByUser)
router.get('/admin', [verifyAccessToken, isAdmin], orderController.getOrderByAdmin)

module.exports = router