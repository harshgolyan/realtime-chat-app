const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId;

const chatSchemaMongoose = new mongoose.Schema({
    chatName: {
        type: String,
        trim: true
    },
    isGroupChat: {
        type: Boolean,
        default: false
    },
    users: [{
        type: objectId,
        ref: "User"
    }],
    latestMessage: {
        type: objectId,
        ref: "Message"
    },
    groupAdmin: {
        type: objectId,
        ref: "User"
    }
});

const Chat = mongoose.model("Chat", chatSchemaMongoose);
module.exports = Chat;