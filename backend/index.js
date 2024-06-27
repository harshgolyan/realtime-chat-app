const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const color = require("colors")
const dotenv = require("dotenv")

const app = express()
dotenv.config()
const port = 3000 || process.env.PORT

app.use(express.json());
app.use(cors())

app.use(require('./routes/auth'))
app.use(require('./routes/user'))


const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGO_URI)
        console.log("database connected".yellow.italic.underline)
    }
    catch (error) {
        console.log(error)
    }
}

connectDB();

app.listen(port, () => {
    console.log(`server is running at ${port}`.cyan.bold);
})