const router = require("express").Router()
const { verifyAccessToken, isAdmin } = require('../middlewares/verifyToken')
const userController = require('../controllers/user')

router.post('/register', userController.register)
router.post('/login', userController.login)
router.get('/current', verifyAccessToken, userController.getOne)
router.post('/refresh-token', userController.refreshToken)
router.get('/logout', userController.logout)
router.get('/forgot-password', userController.forgotPassword)
router.put('/reset-password', userController.resetPassword)
router.get('/', [verifyAccessToken, isAdmin], userController.getUsers)
router.delete('/', [verifyAccessToken, isAdmin], userController.deleteUser)
router.put('/current', [verifyAccessToken], userController.updateUser)
router.put('/address', [verifyAccessToken], userController.updateUserAddress)
router.put('/cart', [verifyAccessToken], userController.updateUserCart)
router.put('/:uid', [verifyAccessToken, isAdmin], userController.updateUserByAdmin)

module.exports = router