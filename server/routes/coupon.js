const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const couponController = require('../controllers/coupon')

router.post('/create', [verifyAccessToken, isAdmin], couponController.createCoupon)
router.get('/all', couponController.getCoupons)
router.put('/:cid', [verifyAccessToken, isAdmin], couponController.updateCoupon)
router.delete('/:cid', [verifyAccessToken, isAdmin], couponController.deleteCoupon)

module.exports = router