const mongoose = require("mongoose");

const objectId = mongoose.Schema.Types.ObjectId
const messageSchemaMongoose = new mongoose.Schema({
  sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  content: { type: String, trim: true },
  chat: { type: mongoose.Schema.Types.ObjectId, ref: "Chat" },
  readBy: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
});

const Message = mongoose.model("Message", messageSchemaMongoose);
module.exports = Message;
