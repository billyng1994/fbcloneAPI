const express = require("express")
const router = express.Router()
const FBposts = require('../models/FBposts.js')
const sha256 = require("crypto-js/sha256")
const FBmembership = require('../models/FBmembership')

// Post
router.post("/create", async (req,res) => {    
    const currentDate = new Date()

    let postImg
    let postImgPath

    if(req.files){
        postImg = req.files.postImg   
        postImgPath = "http://localhost:9999/postImg/" + postImg.name
    }

    const newPost = new FBposts({
        postOwner: req.body.postOwner,
        postDate: currentDate.toISOString(),
        postText: req.body.postText,
        postPhotos: postImgPath,
        postLink: req.body.postLink,
        postLike: req.body.postLike,
        postShare: req.body.postShare,
        postComment: req.body.postComment
    })
    
    try{
        if(req.files){
            postImg.mv("./public/postImg/" + postImg.name)
        }
        const result = await newPost.save();
        res.status(201).json(result) // Status code 201 mean successful create data
    } catch(err){
        res.status(400).json({message: err.message}) // Status code 400 means user gives bad data
    }
})

// Get all post
router.get("/", async (req, res) => {
    try{
        const FBpost = await FBposts.find()
        if (FBpost)
            res.json(FBpost) // Respon with the json data
        else
            res.status(404).json({message: "post not found"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get many post by friend(newsfeed)
router.get("/newsfeed/:uid", async(req, res) => {
    const uid = req.params.uid
    try{
        const membershipData = await FBmembership.findById(uid) // This find function is like SELETE * in SQL
        
        if (membershipData){
            const friendList = membershipData.friend
            const condition = {$or : []} // perform or condition filter
            friendList.forEach((friend)=>{
                condition.$or.push({postOwner: friend})
            })

            const result = await FBposts.find(condition).sort({postDate:"desc"}).populate("postOwner")

            if(result){
                res.json(result)
            } else {
                res.status(404).json({message:"not found"})
            }
        } else {
            res.status(404).json({message:"not found"})
        }      
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

//Get many post by uid(personal page)
router.get("/personal/:uid", async(req, res) => {
    const uid = req.params.uid
    try{
        const result = await FBposts.find({postOwner: uid}).sort({postDate:"desc"}).populate("postOwner")

        if(result){
            res.json(result)
        } else {
            res.status(404).json({message:"not found"})
        }           
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Get one post
router.get("/:id", async (req, res) => {
    const id = req.params.id
    try{
        const FBpost = await FBposts.findOne({_id: id})
        if (FBpost)
            res.json(FBpost) // Respon with the json data
        else
            res.status(404).json({message: "post not found"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router