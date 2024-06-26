const mongoose = require("mongoose");
const objectId = mongoose.Schema.Types.ObjectId

const messageModel = mongoose.Schema({
    sender: {
        type: objectId,
        ref: "User "
    },
    content: {
        type: String,
        trim: true
    },
    chat: {
        type: objectId,
        ref: "Chat"
    } 
})

const Message = mongoose.model("Message",messageModel);
module.exports = Message;