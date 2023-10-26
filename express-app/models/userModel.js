
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');




const userSchema=new mongoose.Schema({
     entryDate:Date,
     name:String,
     username:String,
     password:String,
     adminStatus:String,
     designation:String,
     address:String
});

const User=mongoose.model('User',userSchema);
module.exports=User;