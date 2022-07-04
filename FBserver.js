require("dotenv").config() // use to load all the varible in .env file to the program 
const express = require("express")
const mongoose = require("mongoose") 
const cors = require('cors');
const fileUpload = require("express-fileupload")

const app = express()

app.use(express.urlencoded({extended: true})) 
app.use(cors()) //serve resource across domin
app.use(express.static("public")) //static resources
app.use(express.json())
app.use(fileUpload({            // file upload middleware
    createParentPath: true
}))


mongoose.connect(process.env.DATABASE_URL, { useNewUrlParser: true, useUnifiedTopology: true }) // connect to the mongoDB, using the URL variable saved in .env file
const db = mongoose.connection 
db.on('error', (error) => console.error(error)) 
db.once('open', () => console.log("Connected to Database")) 

// Use router to organize the API route
const memRegRouter = require("./Routes/memberRegistration")
app.use('/memberRegistration', memRegRouter)

const loginRouter = require("./Routes/login")
app.use('/login', loginRouter)

const FBpostRouter = require("./Routes/FBpostRoute")
app.use('/posts', FBpostRouter)

app.listen(9999, () => console.log("server has started"))