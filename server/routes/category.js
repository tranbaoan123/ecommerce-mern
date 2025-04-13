const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const categoryController = require('../controllers/category')

router.post('/create', [verifyAccessToken, isAdmin], categoryController.createCategory)
router.get('/all', [verifyAccessToken, isAdmin], categoryController.getCategories)
router.put('/:id', [verifyAccessToken, isAdmin], categoryController.updateCategory)
router.delete('/:id', [verifyAccessToken, isAdmin], categoryController.deleteCategory)

module.exports = router