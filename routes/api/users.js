const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const keys = require('../../config/keys')
const passport = require('passport')

//load input validation
const validateRegisterInput = require('../../validation/registration')

//load User model
const User = require('../../models/User')

// @route   GET api/users/test
// @desc    Tests users route
// @access  Public
router.get('/test', (req, res) => res.json({ msg: 'Users Works' }));

module.exports = router;
// @route GET api/users.register
// @desc Regeister
// @access Public
router.post('/register',(req,res)=>{
    const { errors, isValid } = validateRegisterInput(req.body);
    if(!isValid){
        return res.status(400).json(errors)
    }
    
    User.findOne({email:req.body.email})
    .then((user)=>{
        if(user){
            return res.status(400).json({email:"Email already exists"})
        }else{
            const avatar = gravatar.url(req.body.email,{
                s: '200', //size
                r: 'pg', //rating
                d: 'mm' //Default
            })
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                avatar: avatar,
                password: req.body.password
            });
            bcrypt.genSalt(10,(err, salt)=>{
                bcrypt.hash(newUser.password,salt,(err,hash)=>{
                    if(err) throw err;
                    newUser.password = hash;
                    newUser.save()
                    .then(user=>res.json(user))
                    .catch(err=>console.log(err))
                })
            })
        }
        
    })
})

// @route   GET api/user/login
// @desc    login use / returning jwt token
// @access  Public
router.post('/login', (req, res) => {
    const email = req.body.email;
    const password = req.body.password
    User.findOne({email:email}).then(user =>{
        if(!user){
            return res.status(404).json({email:'user not found'})       
        }
        //check password
        bcrypt.compare(password,user.password).then(isMatch=>{
            if(isMatch){
                //jwt payload
                const payload = {
                    id: user.id,
                    name: user.name,
                    avatar: user.avatar
                }
                //sign token
                jwt.sign(payload,keys.secretOrKey,{ expiresIn: 3600 },(err,token)=>{
                    res.json({
                        success:true,
                        token: 'Bearer '+token 
                    })
                });
            }else{
                return res.status(400).json({password:"Password incorrect"})
            }
        })
    }).catch((err)=>{
        console.log(err);

    })
    
});

// @route   GET api/users/current
// @desc    Tests users route
// @access  Private
router.get('/current',passport.authenticate('jwt',{session:false}),(req,res)=>{
    res.json({
        id: req.user.id,
        name: req.user.name,
        email: req.user.email,
        date: req.user.date
    })
})