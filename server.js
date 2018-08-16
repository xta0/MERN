const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const passport = require('passport')

const usersRouter = require('./routes/api/users')
const profileRouter = require('./routes/api/profile')
const postsRouter = require('./routes/api/posts')
const indexRouter = require('./routes/index')


const app = express()

//middle ware
app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json());
app.use(passport.initialize())
require('./config/passport')(passport)

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



app.use('/',indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/profile', profileRouter);
app.use('/api/posts', postsRouter);

const port = process.env.PORT || 5000;
app.listen(port,()=>{
    console.log(`server running on port ${port}`)
});