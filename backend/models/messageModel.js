const mongoose = require("mongoose");
const { z } = require("zod");

const objectId = mongoose.Schema.Types.ObjectId
const messageSchemaMongoose = mongoose.Schema(
  {
    sender: { type: objectId, ref: "User" },
    content: { type: String, trim: true },
    chat: { type: objectId, ref: "Chat" },
    readBy: [{ type: objectId, ref: "User" }],
  },
  { timestamps: true }
);
const Message = mongoose.model("Message", messageSchemaMongoose);
module.exports = Message;
