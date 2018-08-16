const express = require('express')
const router = express.Router()


router.get('/',(req,res,next)=>{
    //log request url
    console.log(req.url)
    next()
})

module.exports = router