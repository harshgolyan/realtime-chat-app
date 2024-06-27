const express = require("express")
const User = require("../models/userModel")
const requireLogin = require("../middleware/requireLogin")
const router = express.Router()


//show all users
router.get("/alluser", requireLogin, (req, res) => {
    const keyword = req.query.search ? {
        $or: [{
            name: {$regex: req.query.search, $options: "i"}
        },{
            email: {$regex: req.query.search, $options: "i"}
        }]
    } : {}
    User.find(keyword).find({_id: {$ne: req.user._id}})
    .then(users => res.json(users))
})

module.exports = router