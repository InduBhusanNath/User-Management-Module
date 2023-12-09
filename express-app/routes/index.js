var express = require('express');
app=express();

var routes=require('./routes.js');
app(use('/',routes));

//var router = express.Router();

/* GET home page. */