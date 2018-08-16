const express = require('express')
const router = express.Router()

//@rout GET api/users/test
//@desc Test Users rout
//@acess public
router.get('/test',(req,res)=>{
    res.json({msg:"Users Works"})
})

module.exports = router