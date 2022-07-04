const express = require("express")
const router = express.Router()
const FBmembership = require('../models/FBmembership')
const sha256 = require("crypto-js/sha256")

router.post("/", async (req, res) => {
    try{
        const membershipData = await FBmembership.findOne({email: req.body.account})

        if(membershipData){
            if(sha256(req.body.password).toString() === membershipData.password.toString())
                res.json({"login":"success", "username": membershipData.firstName + " " + membershipData.lastName, "uid": membershipData._id})
            else 
                res.status(400).json({"error":"Invalid password"})
        } else 
        res.status(404).json({"error": "Invalid username or password"})
    } catch (err) {
        res.status(500).json({message: err.message})
    }
})

module.exports = router