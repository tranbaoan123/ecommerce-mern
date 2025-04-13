const Brand = require('../models/category')
const asyncHandler = require('express-async-handler')
const createBrand = asyncHandler(async (req, res) => {
    const { title } = req.body
    if (!title) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }

    const response = await Brand.create(req.body)

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? 'Created brand successfully' : 'Something went wrong'
    })


})

const getBrands = asyncHandler(async (req, res) => {
    const response = await Brand.find({})

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Fetch all brands successfully' : 'Something went wrong'
    })


})

const updateBrand = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await Brand.findByIdAndUpdate(id, req.body, { new: true })

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Updated Brand successfully' : 'Something went wrong'
    })


})



const deleteBrand = asyncHandler(async (req, res) => {


    const { id } = req.params

    const response = await Brand.findByIdAndDelete(id)

    return res.status(201).json({
        success: response ? true : false,
        data: response,
        mes: response ? 'Deleted Brand successfully' : 'Something went wrong'
    })


})


module.exports = {
    createBrand, getBrands, updateBrand, deleteBrand
}