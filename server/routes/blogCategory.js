const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const blogCategoryController = require('../controllers/blogCategory')

router.post('/create', [verifyAccessToken, isAdmin], blogCategoryController.createBlog)
router.get('/all', [verifyAccessToken, isAdmin], blogCategoryController.getBlogs)
router.put('/:id', [verifyAccessToken, isAdmin], blogCategoryController.updateBlog)
router.delete('/:id', [verifyAccessToken, isAdmin], blogCategoryController.deleteBlog)

module.exports = router