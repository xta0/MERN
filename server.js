const express = require('express')
const mongoose = require('mongoose')

const users = require('./routes/api/users')
const profile = require('./routes/api/profile')
const posts = require('./routes/api/posts')


const app = express()

//DB config
const db = require('./config/keys').mongoURI;

//Connet to MongoDB
mongoose.connect(db)
        .then(()=>{
            console.log("MogoDB Connected")
        })
        .catch((err)=>{
            console.log(err)
        })

app.get('/',(req,res)=>{
    res.send('Hello')
});

// app.use('/',function(req,res){
//     console.log(req.url)
// })
//User Routes
app.use('api/users',(req,res)=>{
    console.log("users worked!")
})
//User Posts
app.use('api/posts',posts)
//User profile
app.use('api/profile',profile)

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});