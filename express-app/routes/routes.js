var express = require('express');
var bodyParser = require('body-parser');
const session=require('express-session');
var app = express();
app.use(express.static('public'));
const multer=require('multer');
 
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/images/BlogImages/');
    },
    filename: function (req, file, cb) {    
        cb(null, file.originalname);
      }
  });  
  const upload = multer({ storage: storage });

//var router = express.Router();


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
var blogController=require('../controllers/blogController.js');
var contactUsMessageModel=require('../controllers/contactUsMessageController.js');
var autoCreateAdminController=require('../controllers/autoCreateAdminController.js');

/* GET*/
app.get('/test', function(req, res) {
  
  console.log("test");
   
});
app.get('/adminLogin/create-auto-admin',autoCreateAdminController.createautoAdmin);
app.get('/adminDashboard/adminUsers',userController.readUsers);
app.get('/admin_session',sessionController.adminSession);
app.get('/admin_logout',sessionController.adminLogOut);
app.get('/adminDashboard/blogs/',blogController.readBlog);
app.get('/adminDashboard/blogs/show_blog',blogController.edit_displayBlog);
app.get('/adminDashboard/contactus-messages/',contactUsMessageModel.readMessages);

    


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
app.post('/adminDashboard/blogs/write_blog/create_blog',upload.single("n_blogpic"),blogController.createBlog);
app.post('/adminDashboard/blogs/show_blog/update-blog-image',upload.single('edit_n_blogpic'),blogController.edit_blogImage);
app.post('/adminDashboard/blogs/show_blog/delete-blog-image',blogController.delete_blogImage);
app.post('/adminDashboard/blogs/show_blog/update-blog-content',blogController.edit_blogContent);
app.post('/adminDashboard/blogs/show_blog/delete-blog-content',blogController.delete_blogContent);
app.post('/contact-us-message',contactUsMessageModel.visitorMessage);
app.post('/adminDashboard/contactus-messages/delete-message/',contactUsMessageModel.deleteMessage);


module.exports = app;

