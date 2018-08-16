const express = require('express')
const router = express.Router()

//@rout GET api/posts/test
//@desc Test post rout
//@acess public
router.get('/test',(req,res)=>{
    res.json({msg:"Posts Works"})
})

module.exports = router