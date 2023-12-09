const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;
   
//Admin Login
function checkAdminUser(req,res,next){
     
      var userName=req.body.userName;
      var userPassword=req.body.userPassword;
      var adminUser;
      req.session.user=userName;
      
      

      userModel.where({username:userName},{password:userPassword}).countDocuments().then(count=>{
           
            if(count=="1"){
                userModel.find().where({username:userName},{password:userPassword},{adminStatus:'Admin'}).then(data=>{
                      
                       
                       
                        if(req.session.user){
                            res.send({"flag":"1", "sessionId":req.session.user});
                        }else{
                            res.send("Cannot Login, Please Try Again.....");
                        }

                        
                        
                        
                       
                        



                       
                       
                       

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