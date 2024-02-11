const userModel=require('../models/userModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const bcrypt = require('bcrypt');
const saltRounds = 10;


function createUser(req,res){
    var originalPwd=req.body.n_password;
    const salt = bcrypt.genSaltSync(saltRounds);
    const original_pwd=bcrypt.hashSync(originalPwd,salt);

    var newUser=new userModel({
        entryDate:req.body.n_entryDate,
        name:req.body.n_name,
        username:req.body.n_username,
        password:original_pwd,
        adminStatus:req.body.n_nonAdmin,
        designation:req.body.n_designation,
        address:req.body.n_address    
      });   
      
      
      userModel.countDocuments({username:testUsername}).then(rows=>{
            if(rows=="0"){
                   newUser.save().then(data=>{
                         res.send("New User Created Successfully.....");
                  })
                  .catch(error=>{
                        res.send(error);
                  });
            }else if(rows=="1"){
                   res.send("User Already Exists.....");
            }else if(rows>"1"){
                   res.send("Duplicate User Suspected.....");
            }
      })
      .catch(error=>{
            res.send(error);
      });

             
      

      
}
function readUsers(req,res){    
            const limit=2;
            const page=req.query.page;
            
            userModel.countDocuments().then(function(rows){
                   var totalRows=rows;
                   var offset=(page-1)*limit;
                   var totalPages=Math.ceil(totalRows/limit);
                   
                   userModel.find({}).skip(offset).limit(limit).then(data=>{
                        res.json(data);
                        console.log(data)
                        
                   });                  
                  
                  
            });  
            
            
                    
     
}

                   
//Fetch Edit Users Data
function editUsersData(req,res){
      var userId=req.body.id;    
      
         
       userModel.find({_id:userId}).then(data=>{             

            res.json(data);
            
            
      });
      
}
//Edit Users
function editUsers(req,res){
      var editId=req.body.n_editId;
      var editEntryDate=req.body.n_editEntryDate;
      var editName=req.body.n_editName;
      var editUsername=req.body.n_editUsername;
      var editAdminStatus=req.body.n_editAdminStatus;
      var editDesignation=req.body.n_editDesignation;
      var editAddress=req.body.n_editAddress;

      userModel.findByIdAndUpdate(
            {_id:editId},
            {
                   entryDate:editEntryDate,
                   name:editName,
                   username:editUsername,
                   adminStatus:editAdminStatus,
                   designation:editDesignation,
                   address:editAddress
            },
            {
                  new: true
            }
      )
      
      .then((data)=>{
            res.send("Data Updated Successfully.....");
      })
      .catch(error=>{
             res.send(error);
      });
      
      

}

//Fetch Delete User Data
function deleteUserData(req,res){
       var delId=req.body.id;
       userModel.findById(delId,'_id name').then(data=>{
            res.json(data);
            
       })
       .catch(error=>{
            
       })
             
       }
//Delete User
function deleteUser(req,res){
       var delId=req.body.id;
       userModel.deleteOne({_id:delId}).then(data=>{
            res.send("User Successfully Deleted.....");
       });

}
//Priviledge User Data
function priviledgeUserData(req,res){
      var privId=req.body.priv_Id;
      userModel.findById(privId,'adminStatus').then(data=>{
            res.json(data);
      });
      
}
//Change User Priviledge
function changeUserPriviledge(req,res){
       var privId1=req.body.priviledgeId;
       var newAdminUser=req.body.newAdminStatus;
       userModel.findByIdAndUpdate({_id:privId1},
            {
                 adminStatus:newAdminUser
            },
            {
                  new:true
            }
            )
            .then(data=>{
                  res.send("Admin Status Change to: "+newAdminUser);
            })
            .catch(error=>{
                  res.send(error);
            });

      
      
      

}
//Change Password
function changePassword(req,res){
       var newPwd_Id=req.body.newPwd_Id;
       var newPassword=req.body.newPassword;

       const salt = bcrypt.genSaltSync(saltRounds);
       const changed_pwd = bcrypt.hashSync(newPassword,salt);
       
       
                  userModel.findByIdAndUpdate(
                         {_id:newPwd_Id},
                         {
                             password:changed_pwd
                         },
                         {
                              new:true
                         }

                  )
                  .then(data=>{
                        res.send("Password Changed Successfully.....");
                  })
                  .catch(error=>{
                        res.send(error);
                  });
                             

            
       
        
}

//Change Password By User
function changePasswordByUser(req,res){
        var n_chgpwdusername=req.body.n_chgpwdusername;
        var n_updatePassword=req.body.n_updatePassword;
        const salt = bcrypt.genSaltSync(saltRounds);
        const changed_pwd_by_user = bcrypt.hashSync(n_updatePassword,salt);

        const query={username:n_chgpwdusername};
        userModel.findOneAndUpdate(query,{$set:{password:changed_pwd_by_user}})
        .then(data=>{
             res.send("Password Successfully Changed.....");
        })
        .catch(error=>{
             res.send(error);
        });

        
}


module.exports={
      createUser:createUser,
      readUsers:readUsers,
      editUsersData:editUsersData,
      editUsers:editUsers,
      deleteUserData:deleteUserData,
      deleteUser:deleteUser,
      priviledgeUserData:priviledgeUserData,
      changeUserPriviledge:changeUserPriviledge,
      changePassword:changePassword,
      changePasswordByUser:changePasswordByUser
}
      







