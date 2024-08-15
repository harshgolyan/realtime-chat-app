const express  = require("express")
const requireLogin = require("../middleware/requireLogin")
const Message = require("../models/messageModel")
const User = require("../models/userModel")
const Chat = require("../models/chatModel")

const router = express.Router()

router.post("/send-message", requireLogin, async (req, res) => {

    const { content, chatId } = req.body;
    
    if (!content || !chatId) {
        return res.status(400).json({ error: "Both content and chatId are required" });
    }
    const newMessage = {
        sender: req.user._id,
        content: content,
        chat: chatId,
    };

    try {
        var message = await Message.create(newMessage);
        message = await message.populate("sender", "name pic");
        message = await message.populate("chat");
        message = await User.populate(message, {
            path: "chat.users",
            select: "name email pic",
        });
        await Chat.findByIdAndUpdate(req.body.chatId, {
            latestMessage: message,
        });

        res.status(200).json({ msg: "New message from sender", message });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "An error occurred while sending the message" });
    }
});    


//get all chat
router.get("/all-chat/:chatId", requireLogin, (req, res) => {
    Message.find({ chat: req.params.chatId })
        .populate("sender", "name email pic")
        .populate("chat")
        .then(messages => {
            res.status(200).json({
                msg: "All messages fetched successfully",
                messages
            });
        })
        .catch(error => {
            res.status(400).json({ msg: error.message });
        });
});



module.exports = router