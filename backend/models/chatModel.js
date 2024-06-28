const mongoose = require("mongoose");
const { z } = require("zod");

const objectId = mongoose.Schema.Types.ObjectId;

const chatSchemaZod = z.object({
    chatName: z.string().trim(),
    isGroupChat: z.boolean().default(false),
    users: z.array(z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "invalid users"
    })),
    latestMessage: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "invalid latest message"
    }).optional(), 
    groupAdmin: z.string().refine(val => mongoose.Types.ObjectId.isValid(val), {
        message: "invalid group admin"
    }).optional()
});

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

chatSchemaMongoose.pre("save", function (next) {
    const chat = this;

    const result = chatSchemaZod.safeParse({
        chatName: chat.chatName,
        isGroupChat: chat.isGroupChat,
        users: chat.users.map(user => user.toString()),
        latestMessage: chat.latestMessage ? chat.latestMessage.toString() : undefined,
        groupAdmin: chat.groupAdmin ? chat.groupAdmin.toString() : undefined
    });

    if (!result.success) {
        const errorMessages = result.error.errors.map(err => err.message).join(", ");
        return next(new Error(errorMessages));
    }

    next();
});

const Chat = mongoose.model("Chat", chatSchemaMongoose);
module.exports = Chat;