const userRouter = require('./user')
const productRouter = require('./product')
const categoryRouter = require('./category')
const blogRouter = require('./blog')
const blogCategoryRouter = require('./blogCategory')
const brandRouter = require('./brand')
const couponRouter = require('./coupon')
const orderRouter = require('./order')
const { errorHandler, notFound } = require('../middlewares/errHandler')
const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use('/api/product', productRouter)
    app.use('/api/category', categoryRouter)
    app.use('/api/blog-category', blogCategoryRouter)
    app.use('/api/blog', blogRouter)
    app.use('/api/brand', brandRouter)
    app.use('/api/coupon', couponRouter)
    app.use('/api/order', orderRouter)
    // app.use(notFound)
    // app.use(errorHandler)
}

module.exports = initRoutes