const express = require("express")
const User = require("../models/userModel")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const requireLogin = require("../middleware/requireLogin")

const router = express.Router()


//sign up
router.post("/signup", (req,res) => {
    const { email,name,password } = req.body;
    if(!email || !name || !password) {
        res.status(422).json({error:"all fields are required"})
    } 
    else {
        User.findOne({email: email})
            .then(savedUser => {
                if(savedUser) {
                    res.status(422).json({error:"user already exist"})
                }
                else {
                    bcrypt.hash(password,12)
                          .then(hashedPassword => {
                            const user = new User({
                                email: email,
                                name: name,
                                password: hashedPassword,
                                // pic
                            })
                            user.save()
                                .then(newUser => {
                                    console.log(newUser)
                                    res.status(200).json({msg: "new user added successfully"})
                                })
                          })
                }
            })
    }
})

//login
router.post("/login", (req,res) => {
    const {email, password} = req.body
    if(!email || !password) {
        res.status(422).json({error: "all fields are required"})
    }
    else {
        User.findOne({email: email})
            .then(oldUser => {
                if(!oldUser) {
                    res.status(422),json({error: "email is not registered"})
                }
                else {
                    bcrypt.compare(password,oldUser.password)
                          .then(match => {
                            if(match) {
                                const uid = oldUser._id
                                const token = jwt.sign({id:uid},process.env.SECRETKEY)
                                res.json({token})
                            }
                            else {
                                res.status(422).json({error: "invalid password"})
                            }
                          })
                }
            })
    }
})


router.get("/protected",requireLogin,(req,res)=>{
   res.json(req.user)
})

module.exports = router;