var express = require('express');
var bodyParser = require('body-parser');
var router = express.Router();


router.use(bodyParser.json()); 
router.use(bodyParser.urlencoded({ extended:true})); 

var userController=require('../controllers/userController.js');
var adminUserController=require('../controllers/adminUserController.js');
const createUser = require('../controllers/userController.js');
var sessionController=require('../controllers/sessionController.js');

/* GET*/
router.get('/test', function(req, res) {
   var test=req.query.page
   console.log(test);
  res.send('test');
});

router.get('/adminDashboard/adminUsers',userController.readUsers);
router.get('/admin_session',sessionController.adminSession);


/*POST*/
router.post('/user_post',userController.createUser);
router.post('/user_edit_data',userController.editUsersData);
router.post('/user_edit',userController.editUsers); 
router.post('/user_delete_data',userController.deleteUserData);
router.post('/user_delete',userController.deleteUser); 
router.post('/user_priviledge_data',userController.priviledgeUserData);
router.post('/user_priviledge_data_change',userController.changeUserPriviledge);
router.post('/change_password',userController.changePassword);
router.post('/check_admin_user',adminUserController.checkAdminUser);









module.exports = router;
