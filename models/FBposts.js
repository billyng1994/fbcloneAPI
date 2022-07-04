const mongoose = require("mongoose")

const FBpostSchema = new mongoose.Schema(
    {
        postOwner: {
            type: mongoose.ObjectId,
            required: true,
            ref: "FBmembership"
        },
        postTag: {
            type: [String]
        },
        postDate:{
            type: Date,
            require: true
        },
        postText:{
            type: String,
            required: true
        },
        postPhotos:{
            type: String,
        },
        postLink:{
            linkTitle:{
                type: String,
                default: ""
            },
            linkDes:{
                type: String,
                default: ""
            },
            link:{
                type: String,
                default: ""
            }
        },
        postLike:{
            type: [String],
            required: true
        },
        postShare:{
            type: [String],
            required: true
        },
        postComment:{
            type: [
                new mongoose.Schema({
                comment:{
                    type: String,
                    required: true
                },
                commentOwner:{
                    type: String,
                    required: true
                },
                commentDate:{
                    type: Date,
                    required: true
                }
            })]
        }
    }
)

module.exports = mongoose.model("FBpost", FBpostSchema)