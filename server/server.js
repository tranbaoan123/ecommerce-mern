const express = require('express');
const connectDB = require('./configs/db-connect');
const initRoutes = require('./routes/index')
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
connectDB()
initRoutes(app)
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);

})