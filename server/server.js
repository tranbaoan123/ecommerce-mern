const express = require('express');
require('dotenv').config()

const app = express();
const PORT = process.env.PORT || 8888;
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/", (req, res) => {
    return "RES SERVER";
})
app.listen(PORT, () => {
    console.log("Server is running on port ", PORT);

})