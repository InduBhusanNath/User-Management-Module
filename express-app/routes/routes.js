var express = require('express');
var bodyParser = require('body-parser');
const session=require('express-session');

//var router = express.Router();
app=express();

app.use(session(
    {
        secret:"orange_cat",
        resave:true,
        saveUninitialized: true,
        cookie: { maxAge: 60000 }
    }
   ));


app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended:true})); 

var userController=require('../controllers/userController.js');
var adminUserController=require('../controllers/adminUserController.js');
const createUser = require('../controllers/userController.js');
var sessionController=require('../controllers/sessionController.js');

/* GET*/
app.get('/test', function(req, res) {
   var test=req.query.page
   console.log(test);
  res.send('test');
});

app.get('/adminDashboard/adminUsers',userController.readUsers);
app.get('/admin_session',sessionController.adminSession);
app.get('/admin_logout',sessionController.adminLogOut);


/*POST*/
app.post('/adminDashboard/adminUsers/user_post',userController.createUser);
app.post('/adminDashboard/adminUsers/user_edit_data',userController.editUsersData);
app.post('/adminDashboard/adminUsers/user_edit',userController.editUsers); 
app.post('/adminDashboard/adminUsers/user_delete_data',userController.deleteUserData);
app.post('/adminDashboard/adminUsers/user_delete',userController.deleteUser); 
app.post('/adminDashboard/adminUsers/user_priviledge_data',userController.priviledgeUserData);
app.post('/adminDashboard/adminUsers/user_priviledge_data_change',userController.changeUserPriviledge);
app.post('/change_password',userController.changePassword);
app.post('/change_password_by_user',userController.changePasswordByUser);
app.post('/check_admin_user',adminUserController.checkAdminUser);


module.exports = app;
