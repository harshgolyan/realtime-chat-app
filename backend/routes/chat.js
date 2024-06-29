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

//fetch chat of login user
router.get("/fetchchat", requireLogin, (req, res) => {
    try {
        Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
        .populate("users", "-password")
        .populate("groupAdmin","-password")
        .populate("latestMessage")
        .sort({updatedAt: -1})
        .then(async (result) => {
            result = await User.populate(result, {
                path: "latestMessage.sender",
                select: "name email pic"
            })
            res.status(200).send(result)
        })  
    } catch (error) {
        console.error("Error fetching chats:", error);
        res.status(500).json({ error: "Internal server error" });
    }
})


module.exports = router;