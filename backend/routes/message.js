const express  = require("express")
const requireLogin = require("../middleware/requireLogin")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const router = express.Router()

router.post("/send-message", requireLogin, (req, res) => {
    const {content, chatId} = req.body
    
    if(!content || !chatId) {
        res.status(400).json({error: "both content and chatId are required"})
    }
    var newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    }

    try {
         Message.create(newMessage)
                .then(message => {
                    console.log(message)
                    return message.populate("sender", "name pic")

                })
                .then(message => {
                    return message.populate("chat")
                })
                .then(message => {
                    return User.populate(message, {
                    path: "chat.users",
                    select: "name email pic"
                    });
                })
                Chat.findByIdAndUpdate(req.body.chatId, {
                    latestMessage: newMessage
                })
                res.status(200).json({msg: "new message from sender"})
    } catch (error) {
        res.json(400).json({error: error})
    }
})

//get all chat

// router.get("/all-chat/:chatId", requireLogin, (req, res) => {
//     try {
//         Message.find({chat: req.params.chatId})
//                .then(messages => {
//                 // console.log(messages)
//                 return messages.populate("sender", "name email pic")
//                })
//                .then(messages => {
//                 return messages.populate("chat")
//                })
//                res.status(200).json({msg: "all message fetched successfully"})
//     } catch (error) {
//         res.status(400)
//         throw new Error(error.message)
//     }
// })

router.get("/all-chat/:chatId", requireLogin, (req, res) => {
    Message.find({ chat: req.params.chatId })
        .populate("sender", "name email pic")
        .populate("chat")
        .then(messages => {
            return User.populate(messages, {
                path: "chat.users",
                select: "name email pic"
            });
        })
        .then(populatedMessages => {
            res.status(200).json({
                msg: "All messages fetched successfully",
                messages: populatedMessages
            });
        })
        .catch(error => {
            res.status(400).json({ msg: error.message });
        });
});



module.exports = router