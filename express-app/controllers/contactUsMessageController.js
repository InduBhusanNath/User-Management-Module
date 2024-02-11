const contactUsMessageModel=require('../models/contactusMessageModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const express = require('express');

//Create Message
function visitorMessage(req,res){
     var n_date=req.body.n_date;
     var n_name=req.body.n_name;
     var n_contactno=req.body.n_contactno;
     var n_email=req.body.n_email;
     var n_message=req.body.n_message;

     var newContactUsMessage=new contactUsMessageModel(
         {
             msgDate:n_date,
             msgName: n_name,
             msgContactNo:n_contactno,
             msgEmail:n_email,
             msgMessage:n_message
         }

     );
     newContactUsMessage.save().then(result=>{
         res.send("Your Message is Submited Successfully.....");
     }).catch(error=>{
         res.send(error);
     });

     
}
//Read Messages
function readMessages(req,res){
     var pageNo;
     
     if(!req.query.pg){
         pageNo=1;
    
     }else{
         pageNo=req.query.pg;    
        }  

     var totalMessages;
     var totalPages;
     var pageLimit=2;
     var offset=(pageNo-1)*pageLimit;
     

     contactUsMessageModel.countDocuments({}).then(rows=>{
          if(rows===0){
            res.json({
                "flag":"0",
                "totalMessages":"0",
                "totalPages":"0",
                "result":[]                 
             });
          }else if(rows>0){
             countMessages(rows);
          }
     }).catch(error=>{

     });

     function countMessages(rows){
         totalMessages=rows;
         totalPages=Math.ceil(rows/pageNo);
         contactUsMessageModel.find({}).skip(offset).limit(pageLimit).sort({msgDate:-1})
         .then(result=>{
              res.json({
                 "flag":"1",
                 "totalMessages":totalMessages,
                 "lastPage":totalPages,
                 "result":result                  
              });
              console.log(result);
         })
         .catch(error=>{
            res.json({
                "flag":"error",
                "totalMessages":"0",
                "totalPages":"0",
                "result":[]                 
             });

         });
         
        


     }
     
    

}
//Delete Message
async function deleteMessage(req,res){
    var n_delMsgId=req.body.n_delMsgId;
    await contactUsMessageModel.deleteOne({_id:n_delMsgId})
    .then(result=>{
         res.send("Message Deleted Successfully.....");
    })
    .catch(error=>{
        res.send("Could Not Delete Message.....");
    });
     

}




module.exports={
     visitorMessage:visitorMessage,
     readMessages:readMessages,
     deleteMessage:deleteMessage
    
}