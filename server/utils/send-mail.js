const nodemailer = require('nodemailer')
const sendMail = async ({ email, html }) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for port 465, false for other ports
        auth: {
            user: process.env.EMAIL_NAME,
            pass: process.env.EMAIL_APP_PASSWORD,
        },
    });

    // async..await is not allowed in global scope, must use a wrapper
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"ecommerce" <ecommerce@gmail.com>', // sender address
        to: email, // list of receivers
        subject: "Reset Password", // Subject line
        html: html
    });

    return info
}
module.exports = sendMail