const Blog = require('../models/blog')
const asyncHandler = require('express-async-handler')
const createBlog = asyncHandler(async (req, res) => {
    const { title, description, category } = req.body
    if (!title || !description || !category) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    const response = await Blog.create(req.body)
    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})



const updateBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    if (Object.keys(req.body).length === 0) throw new Error('Missing  inputs')
    const response = await Blog.findByIdAndUpdate(id, req.body, { new: true })
    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})

const getAllBlogs = asyncHandler(async (req, res) => {
    const response = await Blog.find({})
    return res.status(200).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})


const likeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing Inputs')
    const blog = await Blog.findById(bid)
    const alreadyDisliked = blog.disLikes.find(el => el.toString() === _id)
    if (alreadyDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    }
    const isLiked = blog.likes.find(el => el.toString() === _id)
    if (isLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    }

})


const dislikeBlog = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { bid } = req.params
    if (!bid) throw new Error('Missing Inputs')
    const blog = await Blog.findById(bid)
    const alreadyLiked = blog.likes.find(el => el.toString() === _id)
    if (alreadyLiked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { likes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    }
    const isDisliked = blog.disLikes.find(el => el.toString() === _id)
    if (isDisliked) {
        const response = await Blog.findByIdAndUpdate(bid, { $pull: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    } else {
        const response = await Blog.findByIdAndUpdate(bid, { $push: { disLikes: _id } }, { new: true })
        return res.json({
            success: response ? true : false,
            mes: response
        })
    }

})

const getBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    const blog = await Blog.findByIdAndUpdate(bid, { $inc: { numberViews: 1 } }, { new: true }).populate('likes', 'firstName lastName').populate('disLikes', 'firstName lastName')
    return res.json({
        success: blog ? true : false,
        mes: blog
    })
})

const deleteBlog = asyncHandler(async (req, res) => {
    const { id } = req.params
    const blog = await Blog.findByIdAndDelete(id)
    return res.json({
        success: blog ? true : false,
        mes: blog || 'Something went wrong'
    })
})
const uploadImageBlog = asyncHandler(async (req, res) => {
    const { bid } = req.params
    if (!req.file) throw new Error('Missing Inputs')
    const response = await Blog.findByIdAndUpdate(bid, { image: req.file.path }, { new: true })
    return res.status(200).json({
        status: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })
})
module.exports = {
    createBlog,
    updateBlog,
    getAllBlogs,
    likeBlog,
    dislikeBlog,
    getBlog,
    deleteBlog,
    uploadImageBlog
}