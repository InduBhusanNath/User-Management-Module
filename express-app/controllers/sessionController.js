const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function adminSession(req, res){
     var sessionId=req.session.user;
     userModel.find({username:sessionId}).then(data=>{
         res.json(data);
     });
      
}
//Admin Log Out
function adminLogOut(req,res){     
      console.log(req.session.user); 
      req.session.destroy(err=>{
           if(err){
                res.send("-1");
           }else{
                res.send("1");
           }
      });
}

module.exports={
     adminSession:adminSession,
     adminLogOut:adminLogOut
}