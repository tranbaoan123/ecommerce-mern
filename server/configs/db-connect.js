const { default: mongoose } = require('mongoose')
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI);
        if (conn.connection.readyState === 1) {
            console.log("DB connection success");
        }
    } catch (error) {
        console.log("DB CONNECT FAILED");
        throw new Error(error)
    }
}
module.exports = connectDB