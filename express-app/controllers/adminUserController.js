const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
   
//Admin Login
function checkAdminUser(req,res,next){
     
      var userName=req.body.userName;
      var originalPassword=req.body.userPassword;   

      userModel.countDocuments({username:userName}).then(count=>{
        if(count=="0"){
             res.send({"flag":"0"});
        }else if(count>1){
             res.send({"flag":"1+"});
        }else if(count=="1"){
             userModel.findOne({username:userName},'password').then(data=>{
                 var pwd=data.password;
                 bcrypt.compare(originalPassword,pwd,function(err,result){
                     if(result==true){
                        userModel.countDocuments({username:userName,password:pwd,adminStatus:'Admin'}).then(count=>{
                             if(count=="1"){
                                 req.session.user=userName;
                                 res.send({"flag":"1"});
                            }
                        });
                     }else if(result==false){
                         res.send({"flag":"0+"});
                     }else if(err){
                         res.send({"flag":"err"});
                     }

                 });
             });
             
        }
      });
      
     



}

module.exports={
     checkAdminUser:checkAdminUser

}