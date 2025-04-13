const jwt = require('jsonwebtoken')


const generateAccessToken = (userId, roleId) => {
    return jwt.sign({ _id: userId, roleId }, process.env.JWT_SECRET, { expiresIn: '3d' })
}
const generateRefreshToken = (userId) => {
    return jwt.sign({ _id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' })
}
module.exports = {
    generateAccessToken, generateRefreshToken
}