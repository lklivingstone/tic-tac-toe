const router= require("express").Router()
const User= require("../models/User")
const CryptoJS= require("crypto-js")
require("dotenv/config")
const jwt= require("jsonwebtoken")
const StreamChat = require('stream-chat').StreamChat;

const stream_key= process.env.STREAM_KEY
const stream_secret_key= process.env.STREAM_SECRET_KEY

const serverClient= StreamChat.getInstance(stream_key, stream_secret_key)



//REGISTER
router.post("/register", async (req, res)=> {
    const newUser = new User({
        name: req.body.name,
        username: req.body.username,
        email: req.body.email,
        password: CryptoJS.AES.encrypt(req.body.password, process.env.CRYPTO_KEY).toString(),
    })

    try{
        const savedUser= await newUser.save()
        const {password, ...others }= savedUser._doc
        const token= serverClient.createToken(savedUser._id.toString())
        res.status(200).json({...others, token})
    }catch(err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try{
        const user= await User.findOne({username: req.body.username})
        if (!user) {
            console.log(1)
            res.status(401).json("wrong credentials")
        }
        else {
            // console.log(2)
            const OriginalPassword= CryptoJS.AES.decrypt(user.password, process.env.CRYPTO_KEY).toString(CryptoJS.enc.Utf8)

            if (OriginalPassword!==req.body.password) {
                res.status(401).json("wrong credentials")
            }
            else {

                // console.log(user._id.toString())
                const token= serverClient.createToken(user._id.toString())
                const accessToken= jwt.sign({
                    id: user._id,
                }, process.env.JWT_KEY, { expiresIn: "5h"})
                const { password, ...other }= user._doc
                res.status(200).json({...other, token, accessToken})
            }
        }
    }catch(err) {
        // console.log(3)
        res.status(500).json(err)
    }
})

router.get("/users", async (req, res) => {
    try {
        const foundUsers= await User.find()

        res.status(200).json(foundUsers)
    }
    catch(err) {
        
    }
})
module.exports= router