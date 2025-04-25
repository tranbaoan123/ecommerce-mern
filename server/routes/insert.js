const router = require("express").Router()
const insertController = require('../controllers/insert-data')

router.post('/create-product', insertController.insertProduct)
router.post('/create-cate', insertController.insertCategory)


module.exports = router