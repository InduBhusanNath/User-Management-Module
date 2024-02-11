const contactUsMessageModel=require('../models/contactusMessageModel.js');

contactUsMessageModel.find({}).then(result=>{
    console.log(result);
})