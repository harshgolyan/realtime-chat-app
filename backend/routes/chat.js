const express = require("express")
const Chat = require("../models/chatModel")
const User = require("../models/userModel")
const requireLogin = require("../middleware/requireLogin")
const router = express.Router()

//create chat
router.post("/createchat", requireLogin, async (req, res) => {
    const userId = req.body.userId

    if(!userId) {
        res.status(400).json({error:"invalid user id"})
    }
    var isChat = await Chat.find({
        isGroupChat: false,
        $and:[{
            users:{$elemMatch: {$eq: req.user._id}}
        },{
            users:{$elemMatch: {$eq: userId}}
        }]
    })
    .populate("users", "-password")
    .populate("latestMessage")

    isChat = await User.populate(isChat, {
        path: "latestMessage.sender",
        select: "name pic email"
    })
    
    if(isChat.length > 0) {
        res.send(isChat[0])
    }
    else {
        var chatData = {
            chatName: "sender",
            isGroupChat: false,
            users: [req.user._id, userId]
        }
        try {
            const createdChat = await Chat.create(chatData)
            const fullChat = await Chat.findOne({_id : createdChat._id}).populate("users", "-password")
            res.status(200).json(fullChat)
        } catch (error) {
            console.log(error)
        }
    }
})


module.exports = router;