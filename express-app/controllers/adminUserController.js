const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
   
//Admin Login
function checkAdminUser(req,res,next){
     
      var userName=req.body.userName;
      var originalPassword=req.body.userPassword;   
      
      userModel.findOne({username:userName},'password').then(data=>{
          let pwd=data.password;
          bcrypt.compare(originalPassword,pwd,function(err,result){
                  if(result){
                         userModel.countDocuments({username:userName,password:pwd, adminStatus:'Admin'})
                         .then(count=>{
                                 if(count=="1"){
                                     req.session.user=userName;
                                         if(req.session.user){
                                                 res.send({"flag":"1"});
                                         }else{
                                                 res.send("Cannot Login, Please Try Again.....");
                                         }

                                     }else if(count=="0"){
                                             res.send({"flag":"0"});
                                         }else if(count>1){
                                             res.send({"flag":"1+"});
                                         }                             
                             
                         });
                  }else{
                         res.send({"flag":"0"});
                  }
          });
      });   



}

module.exports={
     checkAdminUser:checkAdminUser

}