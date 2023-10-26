var express = require('express');
var app=express();
var routes=require('./routes/routes');
app.use('/',routes);
app.listen(5000,()=>{
    console.log('Application Started At Port 5000');
})