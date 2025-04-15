const Product = require('../models/product')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const createProduct = asyncHandler(async (req, res) => {
    if (Object.keys(req.body).length === 0) throw new Error("Missing Inputs")
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const newProduct = await Product.create(req.body)
    return res.status(200).json({
        success: newProduct ? true : false,
        createdProduct: newProduct ? newProduct : "Cannot create product"
    })
})


const getProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const product = await Product.findById(pid)
    return res.status(200).json({
        success: product ? true : false,
        result: product ? product : "Product Not Found"
    })
})
const getAllProduct = asyncHandler(async (req, res) => {
    const queries = { ...req.query }
    const excludeFields = ['limit', 'sort', 'page', 'fields']
    excludeFields.forEach(el => delete queries[el])
    let queryString = JSON.stringify(queries)
    queryString = queryString.replace(/\b(gte|gt|lt|lte)\b/g, matchEl => `$${matchEl}`)
    const formattedQuery = JSON.parse(queryString)
    // Filtering
    if (queries?.title) formattedQuery.title = { $regex: queries.title, $options: 'i' }
    let queryCommand = Product.find(formattedQuery)
    // Sorting

    // abc,efg=>[abc,efg] => abc efg
    if (req.query.sort) {
        const sortBy = req.query.sort.split(',').join(' ')
        queryCommand = queryCommand.sort(sortBy)
    }

    // Pagination
    // limit: số object lấy về 1lan62 gọi API
    // skip:2

    const page = +req.query.page || 1;
    const limit = +req.query.limit || process.env.LIMIT_PRODUCTS
    const skip = (page - 1) * limit
    queryCommand.skip(skip).limit(limit)
    //  Filed Limiting
    if (req.query.fields) {
        const fields = req.query.fields.split(',').join(' ')
        queryCommand = queryCommand.select(fields)
    }
    //Execute Query
    queryCommand.then(async (response) => {
        try {
            const counts = await Product.find(formattedQuery).countDocuments()
            return res.status(200).json({
                success: response ? true : false,
                result: response ? response : "Cannot Get Product List",
                counts
            })
        } catch (error) {
            throw new Error(error)
        }
    })

})



const updateProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (req.body && req.body.title) req.body.slug = slugify(req.body.title)
    const updatedProduct = await Product.findByIdAndUpdate(pid, req.body, { new: true })
    return res.status(200).json({
        success: updatedProduct ? true : false,
        result: updatedProduct ? updatedProduct : "Cannot Update Product"
    })
})



const deleteProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    const deletedProduct = await Product.findByIdAndDelete(pid)
    return res.status(200).json({
        success: deletedProduct ? true : false,
        result: deletedProduct ? deletedProduct : "Cannot Delete Product"
    })
})


const ratings = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { star, comment, pid } = req.body
    if (!star || !pid) throw new Error("Missing Inputs")
    const ratingProduct = await Product.findById(pid)
    const alreadyRating = ratingProduct?.rating?.find(el => el.postedBy.toString() === _id)

    if (alreadyRating) {

        await Product.updateOne({
            rating: { $elemMatch: alreadyRating }
        }, {
            $set: { "rating.$.star": star, "rating.$.comment": comment }
        }, { new: true })
    } else {

        await Product.findByIdAndUpdate(pid, {
            $push: { rating: { star, comment, postedBy: _id } }
        }, { new: true })
    }
    const updatedProduct = await Product.findById(pid)

    const ratingCount = updatedProduct.rating.length
    const sumRating = updatedProduct.rating.reduce((sum, el) => sum + el.star, 0)
    updatedProduct.totalRating = Math.round(sumRating * 10 / ratingCount) / 10
    await updatedProduct.save()
    return res.status(200).json({ status: true, updatedProduct })
})
const uploadImagesProduct = asyncHandler(async (req, res) => {
    const { pid } = req.params
    if (!req.files) throw new Error('Missing Inputs')
    const response = await Product.findByIdAndUpdate(pid, { $push: { images: { $each: req.files.map(el => el.path) } } }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})
module.exports = {
    createProduct, getProduct, getAllProduct, updateProduct, deleteProduct, ratings, uploadImagesProduct
}