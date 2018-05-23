const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const  { User }  = require('../model/usermodel')
const mongoose = require('mongoose')
const pwd = process.env.SECRETCODE

module.exports = {

    register:function (req,res) {
        
        let{username,email,password} = req.body
        let token = jwt.sign({username},'SECRET');

        let userregister = new User ({
            username,
            email,
            password
        })

    userregister
        .save((err, result) => {
            const msg = 'email atau password salah'

            if (!err) {
                res.status(201).json({
                    message: 'registered succes',
                    data: result
                })
            } else {
                res.status(500).json({
                message: msg
                })
            }
        })
    },
   
    login:function (req,response) {
        //console.log(req.body);
       
        User.findOne({
            username: req.body.username,
        }
        ,function(err, user){
            if (err) {  
                console.log('masuk err');           
                throw err
            }else if(user!==null){
                console.log(user);
                
            user.comparePassword(req.body.password, function(err,isMatch){
                    
                    if(err){
                        console.log(err.response);   
                        throw err;
                        
                    }
                    if(isMatch){    
                        let token = jwt.sign({id:user._id,username:user.username},"SECRET");
                        response.status(200).json({token})
                    }
                   
                    
                })
            } else{
                response.status(500).json('WRONG PASSWORD')
            }                       
        })
    },
    
    loginfb:function(req,response){
        console.log('masuuuk',req.body);
        
    }
}