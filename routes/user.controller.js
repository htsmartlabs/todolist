const express = require('express');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');

const router = express.Router();

const User = require('../model/user.model');
const auth = require('../config/token');
const objId = require('mongoose').Types.ObjectId;

//get all users
router.get('/',(req,res,next)=>{
    User.find()
    .select('-password')
    .exec()
    .then(data => {
        res.json({
            status: true, 
            message: "List of Users", 
            user: data
        });
    })
    .catch(next);
});

//register route
router.post('/',(req,res,next) => {
    User.find({email: req.body.email})
    .exec()
    .then(data =>{
        if(data.length >= 1){
            return res.json({ status:false, message: "email already in use"});
        }else{
            bcryptjs.hash(req.body.password, 10 , (error,hashPassword) =>{
                if(error){
                    return res.json({ status:false, message:"Error "+ err });
                }else{
                    const user = new User({
                        name: req.body.name,
                        email: req.body.email,
                        password: hashPassword,
                        pin:req.body.pin,
                        kids:req.body.kids
                    });
                    user.save()
                    .then(data => {
                        res.json({
                            status: true, 
                            message: "User added successfully" 
                        });        
                    })
                    .catch(next);                
                }
            });
        }
    })
    .catch(next);
});

//update user
router.put('/:id',auth,(req,res,next)=>{
    if(!objId.isValid(req.params.id)){
        return res.json({status:false,msg:"Invalid user id"});
    }else{
        User.findById(req.params.id)
        .exec()
        .then(data => {
            if(data.length < 1){
                res.json({status:false,msg:"No user found"});
            }else{
                bcryptjs.hash(req.body.password, 10 , (error,hashPassword)=>{
                    if(error){
                        return res.json({ status:false, message:"Error "+ err });
                    }else{
                        const user = {
                            name: req.body.name,
                            email: req.body.email,
                            password: hashPassword
                        }
                        User.findByIdAndUpdate(req.params.id,{$set:user},{new:true})
                        .exec()
                        .then(data => {
                            res.json({status:true,message:"User updated Successfully"});
                        })
                        .catch(next);
                    }
                })
            }
        })
        .catch(next);
    }
});

//delete user
router.delete('/:id',auth,(req,res,next)=>{
    if(!objId.isValid(req.params.id)){
        return res.json({status:false,msg:"Invalid user id"});    
    }else{
        User.findByIdAndRemove(req.params.id)
        .exec()
        .then(data =>{
            res.json({status:true,message:"User deleted Successfully"});
        })
        .catch(next)
    }
});

//login route
router.post('/login',(req,res,next)=>{
    User.find({email: req.body.email})
    .exec()
    .then(user =>{
        if(user.length < 1){
            return res.json({status: false , meassage: "Auth Failed"});
        }else{
            bcryptjs.compare(req.body.password, user[0].password,(error,data)=>{
                if(error){
                    return res.json({status:false,message:"Error: "+error});
                }
                else{
                    if(data){
                        const token = jwt.sign({id: user[0]._id},'citicollege',{expiresIn: '1hr'});
                        return res.json({status: true, message: "Auth Successful",token:token});
                    }else{
                        return res.json({status:false,message:"Auth Failed"});
                    }
                }
            });
        }
    })
    .catch(next);
});


module.exports = router;