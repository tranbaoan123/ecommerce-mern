const Category = require('../models/category')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const createCategory = asyncHandler(async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }

    const response = await Category.create(req.body)

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? 'Created category successfully' : 'Something went wrong'
    })


})

const getCategories = asyncHandler(async (req, res) => {
    const response = await Category.find({})

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Fetch all categories successfully' : 'Something went wrong'
    })


})

const updateCategory = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await Category.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Updated Category successfully' : 'Something went wrong'
    })


})



const deleteCategory = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await Category.findByIdAndDelete(id)

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Deleted Category successfully' : 'Something went wrong'
    })


})


module.exports = {
    createCategory, getCategories, updateCategory, deleteCategory
}