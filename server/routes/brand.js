const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const brandController = require('../controllers/brand')

router.get('/all', brandController.getBrands)
router.post('/create', [verifyAccessToken, isAdmin], brandController.createBrand)
router.put('/:id', [verifyAccessToken, isAdmin], brandController.updateBrand)
router.delete('/:id', [verifyAccessToken, isAdmin], brandController.deleteBrand)

module.exports = router