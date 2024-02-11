const mongoose=require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');


     const contactusMessageSchema=new mongoose.Schema({
         msgDate:String,
         msgName:String,
         msgContactNo:String,
         msgEmail:String,
         msgMessage:String
     });

     const ContactUsMessage=mongoose.model('ContactUsMessage',contactusMessageSchema);
     module.exports=ContactUsMessage;