const Coupon = require('../models/coupon')
const asyncHandler = require('express-async-handler')
const slugify = require('slugify')
const createCoupon = asyncHandler(async (req, res) => {
    const { name, discount, expireDate } = req.body
    if (!name || !discount || !expireDate) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }

    const response = await Coupon.create({ ...req.body, expireDate: Date.now() + +expireDate * 24 * 60 * 60 * 1000 })

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })


})



const getCoupons = asyncHandler(async (req, res) => {

    const response = await Coupon.find({})

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })


})


const updateCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params
    if (Object.keys(req.body).length === 0) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    if (req.body.expireDate) req.body.expireDate = Date.now() + + req.body.expireDate * 24 * 60 * 60 * 1000

    const response = await Coupon.findByIdAndUpdate(cid, req.body, { new: true })

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })



})
const deleteCoupon = asyncHandler(async (req, res) => {
    const { cid } = req.params

    const response = await Coupon.findByIdAndDelete(cid)

    return res.status(201).json({
        success: response ? true : false,
        mes: response ? response : 'Something went wrong'
    })



})
module.exports = {
    createCoupon,
    getCoupons,
    updateCoupon,
    deleteCoupon
}