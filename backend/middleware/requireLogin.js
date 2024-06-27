const express = require("express")
const jwt = require("jsonwebtoken")
const User = require("../models/userModel")

module.exports = (req, res, next) => {
    const authorization = req.headers.authorization
    if(! authorization) {
        res.status(422).json({error: "you must be logged in"})
    }
    else {
        const token = authorization.replace("Bearer ","")
        jwt.verify(token, process.env.SECRETKEY, (err, payload) => {
            if(err) {
                res.status(401).json({error: "you must be logged in"})
            }
            else {
                const {id} = payload
                User.findById(id)
                    .then(userData => {
                        userData.password = undefined,
                        req.user = userData
                        console.log(userData)
                        next()
                    })
            }
        })
        
    }
}