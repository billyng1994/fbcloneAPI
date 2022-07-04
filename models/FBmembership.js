const mongoose = require("mongoose")

const membershipSchema = new mongoose.Schema(
    {
        firstName: {
            type: String,
            required: true
        },
        lastName: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        brithDay: {
            type: Date,
            required: true
        },
        phoneNum: {
            type: String,
            required: true
        },
        gender: {
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        friend: {
            type: [mongoose.ObjectId],
            ref:"FBmembership"
        },
        interest:{
            type:[String]
        },
        subscription:{
            type:[String]
        },
        profileImg:{
            type:String
        }
    }
)

module.exports = mongoose.model("FBmembership", membershipSchema)