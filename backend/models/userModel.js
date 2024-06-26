const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const userModel = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    pic: {
        type: String,
        required: true,
        default: "https://cdn-icons-png.flaticon.com/128/3135/3135715.png"
    }
})

const User = mongoose.model("User",userModel);
module.exports = User;