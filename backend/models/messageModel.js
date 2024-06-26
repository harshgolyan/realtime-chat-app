const mongoose = require("mongoose");
const { z } = require("zod");

const objectId = mongoose.Schema.Types.ObjectId;

const messageModelZod = z.object({
    sender: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid sender ID"
    }),
    content: z.string().trim(),
    chat: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "Invalid chat ID"
    })
});

const messageSchemaMongoose = new mongoose.Schema({
    sender: {
        type: objectId,
        ref: "User",
        required: true
    },
    content: {
        type: String,
        trim: true,
        required: true
    },
    chat: {
        type: objectId,
        ref: "Chat",
        required: true
    }
});

messageSchemaMongoose.pre("save", function (next) {
    const message = this;

    const result = messageModelZod.safeParse({
        sender: message.sender.toString(),
        content: message.content,
        chat: message.chat.toString()
    });

    if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message).join(", ");
        return next(new Error(errorMessages));
    }

    next();
});

const Message = mongoose.model("Message", messageSchemaMongoose);
module.exports = Message;
