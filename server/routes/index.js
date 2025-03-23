const userRouter = require('./user')
const { errorHandler, notFound } = require('../middlewares/errHandler')
const initRoutes = (app) => {
    app.use('/api/user', userRouter)
    app.use(notFound)
    app.use(errorHandler)
}

module.exports = initRoutes