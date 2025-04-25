const express = require('express');
const cookieParser = require('cookie-parser')
const connectDB = require('./configs/db-connect');
const initRoutes = require('./routes/index')
const cors = require('cors')
require('dotenv').config()

const app = express();
app.use(cors({ origin: process.env.CLIENT_URI, methods: ['POST', 'PUT', 'GET', 'DELETE'] }))
app.use(cookieParser())
const PORT = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
initRoutes(app)
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);

})