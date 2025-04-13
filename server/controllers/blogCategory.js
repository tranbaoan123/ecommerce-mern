const BlogCategory = require('../models/blogCategory')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const createBlog = asyncHandler(async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }

    const response = await BlogCategory.create(req.body)

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? 'Created blog category successfully' : 'Something went wrong'
    })


})

const getBlogs = asyncHandler(async (req, res) => {
    const response = await BlogCategory.find({})

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Fetch all blog categories successfully' : 'Something went wrong'
    })


})

const updateBlog = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await BlogCategory.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Updated Blog Category successfully' : 'Something went wrong'
    })


})



const deleteBlog = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await Blog.findByIdAndDelete(id)

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Deleted Category successfully' : 'Something went wrong'
    })


})


module.exports = {
    createBlog, getBlogs, updateBlog, deleteBlog
}