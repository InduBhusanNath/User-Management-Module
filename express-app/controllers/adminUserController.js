const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
const express=require('express');
const session = require('express-session');
const app=express();

//Admin Login
function checkAdminUser(req,res){
      var userName=req.body.userName;
      var userPassword=req.body.userPassword;
      var adminUser;

      userModel.where({username:userName},{password:userPassword}).countDocuments().then(count=>{
           
            if(count=="1"){
                userModel.find().where({username:userName},{password:userPassword}).then(data=>{
                         
                       app.use(session(
                        {
                            secret:"orange_cat",
                            resave:true,
                            saveUninitialized: true
                        }
                       ));
                       
                       req.session=userName;
                       
                       res.send({"flag":"1", "sessionId":req.session}); 



                       
                       
                       

                });
                
            }else if(count=="0"){
                res.send({"flag":"0"})
            }else if(count>1){
                res.send({"flag":"1+"});
            }

          

             
          
      });
            
     
      



}
module.exports={
     checkAdminUser:checkAdminUser

}