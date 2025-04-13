const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const blogController = require('../controllers/blog')

router.get('/all', blogController.getAllBlogs)
router.get('/one/:bid', blogController.getBlog)
router.post('/create', [verifyAccessToken, isAdmin], blogController.createBlog)
router.put('/like/:bid', [verifyAccessToken], blogController.likeBlog)
router.put('/dislike/:bid', [verifyAccessToken], blogController.dislikeBlog)
router.put('/:id', [verifyAccessToken, isAdmin], blogController.updateBlog)
router.delete('/:id', [verifyAccessToken, isAdmin], blogController.deleteBlog)

module.exports = router