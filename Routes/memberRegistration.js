const express = require("express")
const router = express.Router()
const FBmembership = require('../models/FBmembership')
// import { MemFormValid } from "../validation/MemFormValid.js"
const validation = require("../validation/MemFormValid.js")
const sha256 = require("crypto-js/sha256")

// REST API 5 basic requests

// Getting all members
router.get('/', async (req,res) => {
    try{
        const membershipData = await FBmembership.find() // This find function is like SELETE * in SQL
        res.json(membershipData) // Respon with the json data
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Getting one member by email
router.get('/findBy', async (req,res) => {
    if (req.query.email){
        try{
            const membershipData = await FBmembership.findOne({email: req.query.email})
            res.json(membershipData) // Respon with the json data
        } catch (err) {
            res.status(500).json({message: err.message})
        }
    }
})

// Get one member by UID
router.get('/:uid', async (req,res) => {
    const uid = req.params.uid
    try{
        const membershipData = await FBmembership.findById(uid).populate("friend")

        if(membershipData)
            res.json(membershipData) // Respon with the json data
        else 
            res.status(404).json({"message":"Not found"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

// Creating member 
router.post('/', async (req,res) => {
    // form validation
    const { status, validData, error } = await validation.MemFormValid({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        bYear: req.body.bYear,
        bMonth: req.body.bMonth,
        bDay: req.body.bDay,
        phoneNum: req.body.phoneNum,
        gender: req.body.gender,
        password: req.body.password, 
    })

    if(status === true){
        const membershipData = new FBmembership({
            firstName: validData.firstName,
            lastName: validData.lastName,
            email: validData.email,
            brithDay: validData.bDate,
            phoneNum: validData.phoneNum,
            gender: validData.gender,
            password: sha256(validData.password), 
            friend: req.body.friend,
            interest: req.body.interest,
            subsription: req.body.subsription,
        })

        try {
            const newMember = await membershipData.save()
            res.status(201).json(newMember) // Status code 201 mean successful create data
        } catch (err){
            res.status(400).json({message: err.message}) // Status code 400 means user gives bad data
        }
    } else{
        
        res.status(400).json({"validData": validData, "error": error}) // Status code 400 means user gives bad data
        
        //res.redirect('http://localhost:3000/home')
    }
})

// Updating profile pic
router.patch('/profileImg/:id', async (req,res) => {
    const id = req.params.id

    let profileImg
    let profileImgPath

    if(req.files){
        profileImg = req.files.profileImg   
        profileImgPath = "http://localhost:9999/profileImg/" + profileImg.name
        if(req.files){
            profileImg.mv("./public/profileImg/" + profileImg.name)
        }
    }

    try{
        const membershipData = await FBmembership.findByIdAndUpdate(id, {profileImg: profileImgPath})

        if(membershipData)
            res.json(membershipData)
        else 
            res.status(500).json({message: "fail to log into database"})
    } catch(err) {
        res.status(500).json({message:"Server error"})
        console.log(err)
    }
})

// Updating member
router.patch('/:id', (req,res) => {
    const id = req.params.id
    res.send(`Patch respond ${id}`)
})

// Deleting member
router.delete('/:id', (req,res) => {
    const id = req.params.id
    res.send(`Delete respond ${id}`)
})

module.exports = router