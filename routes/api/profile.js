const express = require('express')
const router = express.Router()

//@rout GET api/profile/test
//@desc Test profile rout
//@acess public
router.get('/test',(req,res)=>{
    res.json({msg:"Profile Works"})
})

module.exports = router