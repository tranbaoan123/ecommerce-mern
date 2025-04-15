const User = require('../models/user')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')
const sendMail = require('../utils/send-mail')
const { generateAccessToken, generateRefreshToken } = require('../middlewares/jwt')
const asyncHandler = require('express-async-handler')
const product = require('../models/product')
const register = asyncHandler(async (req, res) => {
    const { email, password, firstName, lastName } = req.body
    if (!email || !password || !firstName || !lastName) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    const user = await User.findOne({ email })
    if (user) throw new Error('User has existed !')

    else {
        const response = await User.create(req.body)

        return res.status(200).json({
            success: response ? true : false,
            mes: response ? 'Register is successfully. Please login' : 'Something went wrong'
        })

    }


})


const getOne = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const user = await User.findById({ _id }).select("-refreshToken -password -role")
    return res.status(200).json({
        success: user ? true : false,
        result: user ? user : "User Not Found"
    })

})


const login = asyncHandler(async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(400).json({
            success: false,
            mes: "Missing inputs"
        })
    }
    // Refresh Token => cấp lại access token
    // Access Token => xác thực người dùng,phân quyền
    const response = await User.findOne({ email })
    if (response && await response.isCorrectPassword(password)) {
        const { password, role, refreshToken, ...userData } = response.toObject()
        const accessToken = generateAccessToken(response._id, role)
        const newRefreshToken = generateRefreshToken(response._id)
        //Lưu Refresh Token vào Database

        await User.findByIdAndUpdate(response._id, { refreshToken: newRefreshToken }, { new: true })
        //Lưu refresh token vào cookie
        res.cookie('refreshToken', newRefreshToken, { httpOnly: true, maxAge: 7 * 24 * 60 * 60 * 1000 })
        return res.status(200).json({
            success: true,
            accessToken,
            userData
        })

    } else {
        throw new Error("Invalid Data")
    }

})

const refreshToken = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie && !cookie.refreshToken) throw new Error("No refresh token in cookie")
    const result = await jwt.verify(cookie.refreshToken, process.env.JWT_SECRET)
    const response = await User.findOne({ _id: result._id, refreshToken: cookie.refreshToken })
    return res.status(200).json({
        success: response ? true : false,
        newAccessToken: response ? generateAccessToken(response._id, response.role) : 'Refresh Token Invalid'
    })
})



const forgotPassword = asyncHandler(async (req, res) => {
    const { email } = req.query
    if (!email) throw new Error("Missing Email")
    const user = await User.findOne({ email })
    if (!user) throw new Error("User Not Found")
    const resetToken = user.createPasswordChangeToken()
    await user.save()
    const html = `Please click on the link below to reset your password.This link will be expired in 15 minutes from now on.<a href=${process.env.URL_SERVER}/api/user/reset-password/${resetToken}>Click Here</a>`
    const data = {
        email,
        html
    }
    const result = await sendMail(data)
    return res.status(200).json({
        success: true,
        result
    })
})

const resetPassword = asyncHandler(async (req, res) => {
    const { password, token } = req.body
    if (!password || !token) throw new Error("Missing inputs")
    const passwordResetToken = crypto.createHash('sha256').update(token).digest('hex')
    const user = await User.findOne({ passwordResetToken, passwordResetExpired: { $gt: Date.now() } })
    if (!user) {
        throw new Error("Invalid reset token")
    }
    user.password = password
    user.passwordResetToken = undefined
    user.passwordChangeAt = Date.now()
    user.passwordResetExpired = undefined
    await user.save()
    return res.status(200).json({
        success: user ? true : false,
        mes: user ? "Updated Password Successfully !" : "Something went wrong"
    })
})

const logout = asyncHandler(async (req, res) => {
    const cookie = req.cookies;
    if (!cookie || !cookie.refreshToken) throw new Error('No refresh token in cookies')
    //  Xóa refresh cookie ở db
    await User.findOneAndUpdate({ refreshToken: cookie.refreshToken }, { refreshToken: '' }, { new: true })
    //  Xóa refresh token ở client
    res.clearCookie('refreshToken', { httpOnly: true, secure: true })
    return res.status(200).json({
        success: true,
        message: "Logout Successfully !"
    })
})
const getUsers = asyncHandler(async (req, res) => {
    const response = await User.find().select("-refreshToken -password -role");
    return res.status(200).json({
        success: response ? true : false,
        users: response
    })
})

const deleteUser = asyncHandler(async (req, res) => {
    const { _id } = req.query
    if (!_id) throw Error("Missing Inputs !")
    const response = await User.findByIdAndDelete(_id)
    return res.status(200).json({
        success: response ? true : false,
        result: response ? `User with email ${response.email} is deleted successfully` : ''
    })
})


const updateUser = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!_id || Object.keys(req.body).length === 0) throw Error("Missing Inputs !")
    const response = await User.findByIdAndUpdate(_id, req.body, { new: true }).select('-password -role')
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !'
    })
})


const updateUserByAdmin = asyncHandler(async (req, res) => {
    const { uid } = req.params
    if (Object.keys(req.body).length === 0) throw Error("Missing Inputs !")
    const response = await User.findByIdAndUpdate(uid, req.body, { new: true }).select('-password -role -refreshToken')
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !'
    })
})

const updateUserAddress = asyncHandler(async (req, res) => {
    const { _id } = req.user
    if (!req.body.address) throw Error("Missing Inputs !")
    const response = await User.findByIdAndUpdate(_id, { $push: { address: req.body.address } }, { new: true })
    return res.status(200).json({
        success: response ? true : false,
        result: response ? response : 'Something went wrong !'
    })
})


const updateUserCart = asyncHandler(async (req, res) => {
    const { _id } = req.user
    const { pid, quantity, color } = req.body
    if (!pid || !quantity || !color) throw Error("Missing Inputs !")
    const user = await User.findById(_id)
    const alreadyProduct = user.cart.find(el => el.product.toString() === pid)
    if (alreadyProduct) {
        if (alreadyProduct.color === color) {
            const response = await User.updateOne({ cart: { $elemMatch: alreadyProduct } }, { $set: { "cart.$.quantity": alreadyProduct.quantity + +quantity } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                result: response ? response : 'Something went wrong !'
            })
        } else {
            const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
            return res.status(200).json({
                success: response ? true : false,
                result: response ? response : 'Something went wrong !'
            })
        }
    } else {
        const response = await User.findByIdAndUpdate(_id, { $push: { cart: { product: pid, quantity, color } } }, { new: true })
        return res.status(200).json({
            success: response ? true : false,
            result: response ? response : 'Something went wrong !'
        })
    }
})


module.exports = {
    register, login, getOne, refreshToken, logout, forgotPassword, resetPassword, getUsers, updateUser, updateUserByAdmin, deleteUser, updateUserAddress, updateUserCart
}