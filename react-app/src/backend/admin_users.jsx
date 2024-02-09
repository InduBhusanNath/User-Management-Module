import {Helmet} from "react-helmet";
import {useState} from "react";
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";



function AddAdminUser(){
    const current = new Date();
    const date = `${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`;
    //`${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    
    const [visibility_AddUserForm,setVisibility_AddUserForm]=useState('hidden');
    const [visibility_EditUserForm,setVisibility_EditUserForm]=useState('hidden');
    const [visibility_DeleteUserForm,setVisibility_DeleteUserForm]=useState('hidden');
    const [entryDate,setEntryDate]=useState(date);
    const [name,setName]=useState('');
    const [errorName,setErrorName]=useState('');
    const [username,setUsername]=useState('');
    const [errorUsername,setErrorUsername]=useState('');
    const [password,setPassword]=useState('');
    const [errorPassword,setErrorPassword]=useState('');
    const [passwordType,setPasswordType]=useState('password');
    const [chk,setChk]=useState('false');
    const [nonAdmin,setNonAdmin]=useState('Non-Admin');
    const [designation,setDesignation]=useState('');
    const [address,setAddress]=useState('');
    const [users,setUsers]=useState([]);
    const urlprms=new URLSearchParams(window.location.search);
    const page_no=urlprms.get("page");
    
    const [pageNo,setPageNo]=useState(page_no);
    const [useredits,setUseredits]=useState([]);
    const [userDelete,setUserDelete]=useState([]);

    const [editId,setEditId]=useState('');
    const [editEntryDate,setEditEntryDate]=useState('');
    const [editName,setEditName]=useState('');
    const [editErrorName,setEditErrorName]=useState('');
    const [editUsername,setEditUsername]=useState('');
    const [errorEditUsername,setErrorEditUsername]=useState('');
    const [editAdminStatus,setEditAdminStatus]=useState('');
    const [errorAditAdminStatus,setErrorAditAdminStatus]=useState('');
    const [editDesignation,setEditDesignation]=useState('');
    const [errorEditDesignation,setErrorEditDesignation]=useState('');
    const [editAddress,setEditAddress]=useState('');
    const [errorEditAddress, setErrorEditAddress]=useState('');

    const [delId, setDelId]=useState('');
    const [delName, setDelName]=useState('');
    
    const [visibility_PrivilegeUserForm,setVisibility_PrivilegeUserForm]=useState('hidden');
    const [privilegeId,setPrivilegeId]=useState('');
    const [changeAdminStatus,setChangeAdminStatus]=useState('');
    

    const [showPassword,setShowPassword]=useState('password');
    const [changePassword,setChangePassword]=useState('');
    const [errorChangePassword,setErrorChangePassword]=useState('');
    const [checked,setChecked]=useState(false);



    var pg;
    var url_prev;
    var url_next;
    if(page_no==null){
        pg=1;
        url_next='/adminDashboard/adminUsers?page='+(parseInt(pg)+1); 
    }else{
        pg=pageNo;
        if(pg==='1'){
             url_next='/adminDashboard/adminUsers?page='+(parseInt(pg)+1);
        }else{
              url_prev='/adminDashboard/adminUsers?page='+(parseInt(pg)-1);
              url_next='/adminDashboard/adminUsers?page='+(parseInt(pg)+1);
        }
              
        
    }

    
    
    
     //Show Admin User Form

      function ShowAdminUserForm(e){
        e.preventDefault();
        setVisibility_AddUserForm('shown');
        return; 
     }
     
     //Hide Admin User Form
     function HideAdminUserForm(e){
          e.preventDefault();
          setVisibility_AddUserForm('hidden');
          return; 
     }
     //Show/Hide Password
        function ShowHidePwd(e){
               setChk(e.target.checked);
               if(chk){
                      setPasswordType('password');
               }
               if(!chk){
                     setPasswordType('text'); 
               }
        }
      //Edit Form
        function EditUsers(e){
              
              var id=e.target.name;
              
              var fd2=new FormData();
              fd2.append('id',id);
              
              
              axios({
                     method:'post',
                     url:'/adminDashboard/adminUsers/user_edit_data',
                     data:fd2,
                     headers:{'Content-Type':'application/json'}
              })
              .then(function(response){
                     
                     var uEdtData=response.data;

                     //setUseredits(uData);
                     uEdtData.map((eusr)=>{
                             setEditId(eusr._id);
                             setEditEntryDate(eusr.entryDate);
                             setEditName(eusr.name);
                             setEditUsername(eusr.username);
                             setEditAdminStatus(eusr.adminStatus);
                             setEditDesignation(eusr.designation);
                             setEditAddress(eusr.address);                             

                     });

                     

              })
              .catch(function(error){
                     alert(error);
              });
              setVisibility_EditUserForm('shown');
              
        }

        //Hide Edit Admin User Form
       function HideEditAdminUserForm(e){
              e.preventDefault();
              window.location.reload(false);
              setVisibility_EditUserForm('hidden');
              return;
      
      
             }

        
        //Hide Delete Users Form

        function HideDeleteAdminUserForm(e){
              e.preventDefault();
              window.location.reload(false);
              setVisibility_DeleteUserForm('hidden');
              return;
       }

       //Hide Privilidge User Form
       function HideUserPriviledgeForm(e){
               e.preventDefault();
               window.location.reload(false);
               setVisibility_PrivilegeUserForm('hidden');
               return;
       }
       
        
       //Delete User Data
             function DeleteUserData(e){
              var id=e.target.name;
              var fd_dlt_usr_data=new FormData();
              fd_dlt_usr_data.append('id',id);

              axios({
                    method:"post",
                    url:"/adminDashboard/adminUsers/user_delete_data",
                    data:fd_dlt_usr_data,
                    headers:{"Content-Type":"application/json"}
              })
              .then(response=>{                     
                    
                     var uDelData=response.data;  
                     setDelId(uDelData._id);
                     setDelName(uDelData.name);
                                 

              })
              .catch(error=>{
                    alert(error);
              });
              setVisibility_DeleteUserForm('shown');
       }

       //Delete User
       function DeleteUser(e){
              e.preventDefault();
              var fd_usr_dlt=new FormData();
              fd_usr_dlt.append("id",delId);
              axios({
                    method:"post",
                    url:"/adminDashboard/adminUsers/user_delete",
                    data:fd_usr_dlt,
                    headers:{'Content-Type':'application/json'}

              })
              .then(response=>{
                      var dData=response.data;
                      alert(dData);
                     
              })
              .catch(error=>{
                     alert(error);
              });
              
             
       }

       //Assign User Privileges
       function PrivilegeUser(e){
              e.preventDefault();
              var p_id=e.target.name;
              var fd_usr_priv=new FormData();
              fd_usr_priv.append("priv_Id",p_id);

              
              axios({
                      method:"post",
                      url:"/adminDashboard/adminUsers/user_priviledge_data",
                      data:fd_usr_priv,
                      headers:{'Content-Type':'application/json'}
              })
              .then(response=>{                     
                    
                     var uPrivData=response.data;  
                     setPrivilegeId(uPrivData._id);
                     setChangeAdminStatus(uPrivData.adminStatus);        
                     
                     
                                 

              })
              .catch(error=>{
                    alert(error);
              });
              setVisibility_PrivilegeUserForm('shown');

              
       }
       //Change Admin Status
       function SubmitAdminStatus(e){
              e.preventDefault();
              var adm_sts=new FormData();
              adm_sts.append("priviledgeId",privilegeId);
              adm_sts.append("newAdminStatus",changeAdminStatus);

              axios({
                      method:"post",
                      url:"/adminDashboard/adminUsers/user_priviledge_data_change",
                      data:adm_sts,
                      headers:{'Content-Type':'application/json'}

              })
              .then(response=>{
                     alert(response.data);

              })
              .catch(error=>{

              });

      }
       //Show Password
       function ShowPwd(e){
               e.preventDefault();
               setChecked(e.target.checked);
               if(checked==true){
                     setShowPassword('text');  
               }else{
                     setShowPassword('password');
               }              
              
       }

  // Change Password
      function SubmitChangePassword(e){
               e.preventDefault();
               if(!changePassword){
                     setErrorChangePassword('Type New Password.....');
               }
               var chd_pwd=new FormData();
               chd_pwd.append('newPwd_Id',privilegeId)
               chd_pwd.append('newPassword',changePassword);

               axios({
                      method:"post",
                      url:"change_password",
                      data:chd_pwd,
                      headers: { 'Content-Type': 'application/json' }
               })
               .then(response=>{
                     alert(response.data);
               })
               .catch(error=>{
                     alert(error);
               });

      }
        
        
     //Submit Form
       function handleSubmit(e){
               e.preventDefault();
                      if(!name){
                             setErrorName('Type Your Name.....');
                             return;         
                      }
                      if(!username){
                             setErrorUsername('Type Your UserName.....');
                             return;
                      }
                      if(!password){                            
                             setErrorPassword('Type Your Password.....');
                             return;
                      }
                      
                      var fd1=new FormData();
                      fd1.append('n_entryDate',entryDate);
                      fd1.append('n_name',name);
                      fd1.append('n_username',username);
                      fd1.append('n_password',password);
                      fd1.append('n_nonAdmin',nonAdmin);
                      fd1.append('n_designation',designation);
                      fd1.append('n_address',address);
                      
                      axios({
                            method: 'post',
                            url:'/adminDashboard/adminUsers/user_post',
                            data: fd1,
                            headers: {'Content-Type': 'application/json' }
                            
                          })
                      .then(function (response) {                            
                           alert(response.data);
                          })
                          .catch(function (error) {
                            alert(error);
                          });

                         
                      
              
         
      }
      //Submit Edit Form
       function edit_handleSubmit(e){
               e.preventDefault();
               
               if(!editId){
                      alert("Id Missing,Serious Error.....");
                      return;
               }
               if(!editEntryDate){
                      alert("EntryDate Missing,Serious Error.....");
                      return;
               }
               if(!editName){
                      setEditErrorName('Type Name.....');
                      return;
               }
               if(!editUsername){
                      setErrorEditUsername('Type Username.....');
                      return;
               }
               if(!editAdminStatus){
                      setErrorAditAdminStatus('Fatal Error, Admin Status Empty.....');
                      return;      

               }
               

               var fd_edt=new FormData();
               fd_edt.append('n_editId',editId);
               fd_edt.append('n_editEntryDate',editEntryDate);
               fd_edt.append('n_editName',editName);
               fd_edt.append('n_editUsername',editUsername);
               fd_edt.append('n_editAdminStatus',editAdminStatus);
               fd_edt.append('n_editDesignation',editDesignation);
               fd_edt.append('n_editAddress',editAddress);

               axios({
                     method:"post",
                     url:"/adminDashboard/adminUsers/user_edit",
                     data:fd_edt,
                     headers:{'Content-Type':'application/json'}
               })
               .then(function(response){
                     alert(response.data);
               })
               .catch(function(error){
                     alert(error);
               });
       }
   
        useEffect(()=>{
           
           axios.get('/adminDashboard/adminUsers?page='+pg).then(function(response){
              
               setUsers(response.data);
               
               const userdata=response.data;
               userdata.map((usr)=>{
                      setEditId(usr._id);
                      setEditEntryDate(usr.entryDate);
                      setEditName(usr.name);
                      setEditUsername(usr.username);
                      setEditAdminStatus(usr.adminStatus);
                      setEditDesignation(usr.designation);
                      setEditAddress(usr.address);    
                      return usr;                 
               });


           }).catch(function(error){
               alert(error);
           });
       
      },[]);
       
      

      
      
     
     return(<>
            <div className="row">
                 <div className="col-sm-4">
                     <p>Dashboard &gt;Users</p>
                    <button className="button" onClick={ShowAdminUserForm}>&#10133;&nbsp;Users</button>
                 </div>
                 <div className="col-sm-4"></div>
                 <div className="col-sm-4"></div>
            </div>
            <div className="row">
                 <div className={visibility_AddUserForm}>
                     <section className="popup">
                         <button className="hide_btn" onClick={HideAdminUserForm} >&#10060;</button>
                         
                         <h5>ADD USERS</h5>  
                         <form method="post" onSubmit={handleSubmit}>
                              <input type="text" name="n_entryDate" value={entryDate}/>
                              <div className="form-group">
                                     <label>Name</label>
                                     <input type="text" className="form-control" name="n_name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                                     <span className="text-danger small">{errorName}</span>       
                              </div>
                              <div className="form-group">
                                     <label>EMail/Username</label>
                                     <input type="email" className="form-control" name="n_username" value={username} onChange={(e)=>{setUsername(e.target.value)}}/>
                                     <span className="text-danger small">{errorUsername}</span>       
                              </div>
                              <div className="form-group">
                                     <label>Password</label>
                                     <input type={passwordType} class="form-control" name="n_password" value={password} onChange={(e)=>setPassword(e.target.value)}/> 
                                     <span className="text-danger small">{errorPassword}</span>       
                              </div>
                              <div className="form-group">
                                     <input type="checkbox" checked={chk} onClick={ShowHidePwd}/>
                                     <label>&nbsp;Show Password</label> 
                              </div>
                              <div className="form-group">
                                     <label>Admin Status</label>
                                     <input type="text" className="form-control" name="n_adminStatus" value={nonAdmin} readonly/>       
                              </div>
                              <div className="form-group">
                                     <label>Designation</label>
                                     <input type="text" className="form-control" name="n_designation" value={designation} onChange={(e)=>{setDesignation(e.target.value)}}/>       
                              </div>
                              <div className="form-group">
                                     <label>Address</label>
                                     <textarea  className="form-control" name="n_address" value={address} onChange={(e)=>{setAddress(e.target.value)}}/>
                              </div>
                              <br/>
                              <div className="form-group">
                                     <button type="submit" className="submit">ADD USER</button>
                              </div>

                         </form>                    
                     
                     </section>  
                    
                 </div>
                 
                 <div className={visibility_EditUserForm}>
                    <section className="popup">
                             <button className="hide_btn" onClick={HideEditAdminUserForm} >&#10060;</button>
                              <h5>EDIT USERS</h5>  
                              
                                    
                                    <form method="post" onSubmit={edit_handleSubmit}>
                                           <input type="text" name="n_editId" value={editId} onChange={(e)=>{setEditId(e.target.value)}}/>
                                           <input type="text" name="n_editEntryDate" value={editEntryDate} onChange={(e)=>setEditEntryDate(e.target.value)}/>
                                           <div className="form-group">
                                                  <label>Name</label>
                                                  <input type="text" className="form-control" name="n_editName" value={editName} onChange={(e)=>{setEditName(e.target.value)}}/>
                                                  <span className="text-danger small">{editErrorName}</span>       
                                           </div>
                                           <div className="form-group">
                                                  <label>EMail/Username</label>
                                                  <input type="email" className="form-control" name="n_editUsername" value={editUsername} onChange={(e)=>{setEditUsername(e.target.value)}}/>
                                                  <span className="text-danger small">{errorEditUsername}</span>       
                                           </div>
                                           <div className="form-group">
                                                  <label>Admin Status</label>
                                                  <input type="text" className="form-control" name="n_editAdminStatus" value={editAdminStatus} readonly/> 
                                                  <span className="text-danger small">{errorAditAdminStatus}</span> 

                                            </div>
                                            <div className="form-group">
                                                   <label>Designation</label>
                                                   <input type="text" className="form-control" name="n_editDesignation" value={editDesignation} onChange={(e)=>{setEditDesignation(e.target.value)}}/>
                                                   <span className="text-danger small">{errorEditDesignation}</span>       
                                            </div>
                                            <div className="form-group">
                                                  <label>Address</label>
                                                  <textarea  className="form-control" name="n_editAddress" value={editAddress} onChange={(e)=>{setEditAddress(e.target.value)}}/>
                                                  <span className="text-danger small">{errorEditAddress}</span>
                                            </div>
                                            <div class="form-group">
                                                  <button type="submit" class="submit">EDIT USER</button>
                                            </div>


                                    </form>

                      
                       
                    
                    </section>
                 
                 </div>

                 <div className={visibility_DeleteUserForm}>
                      <section className="popup" >
                      <button className="hide_btn" onClick={HideDeleteAdminUserForm} >&#10060;</button>
                      <p/>
                      <span className="font font20">Do You Want to Delete the User <i><b>{delName}</b></i> ?</span>
                      <p/>
                      <form method="post" onSubmit={DeleteUser}>
                             <div className="form-group">  
                                   <input type="text" className="form-control" name="n_editDelId" value={delId} onChange={DeleteUser}/>
                             </div>
                             <div class="form-group">
                                    <button type="submit" class="submit">DELETE USER</button>
                             </div>
                      </form>
                      </section>
                 </div>
                 <div className={visibility_PrivilegeUserForm}>
                      <section className="popup">
                             <button className="hide_btn" onClick={HideUserPriviledgeForm} >&#10060;</button>
                             <form method="post" onSubmit={SubmitAdminStatus}>
                             <div className="form-group">  
                                   <input type="text" className="form-control" name="n_privId" value={privilegeId}/>
                             </div>
                             <div className="form-group"> 
                                    <label>Set Admin Status</label>
                                    <select className="form-select" value={changeAdminStatus} onChange={(e)=>{setChangeAdminStatus(e.target.value)}}>
                                          <option value="Admin">Admin</option>
                                          <option value="Non-Admin">Non Admin</option>
                                    </select>
                             </div>
                             <div class="form-group">
                                    <button type="submit" class="submit">CHANGE ADMIN USER</button>
                             </div>


                             </form>
                             <p>&nbsp;</p>
                             <form method="post" onSubmit={SubmitChangePassword}>
                                    <div className="form-group">  
                                           <input type="text" className="form-control" name="n_chgpwdId" value={privilegeId}/>
                                    </div>
                                    <div className="form-group">
                                                   <label>Type New Password</label>
                                                   <input type={showPassword} className="form-control" name="n_updatePassword" value={changePassword} onChange={(e)=>{setChangePassword(e.target.value)}}/>
                                                   <span className="text-danger small">{errorChangePassword}</span>       
                                    </div>
                                    <div className="form-check">
                                          <input type="checkbox" className="form-check-input" checked={checked} onChange={ShowPwd}/>
                                          <label className="form-check-label">Show Password</label>

                                    </div>
                                    <div class="form-group">
                                           <button type="submit" class="submit">CHANGE PASSWORD</button>
                                    </div>

                             </form>
                      </section>
                 </div>


            </div>
            <div className="row">
              <div className="col-sm-12">
                      <section>
                             <table className="table">
                                    <thead>
                                           <tr>
                                                  <th scope="col" className="text-center">Priviledge</th>
                                                  <th scope="col" className="text-center">Date</th>
                                                  <th scope="col" className="text-center">Name</th>
                                                  <th scope="col" className="text-center">Username</th>
                                                  <th scope="col" className="text-center">Admin Status</th>
                                                  <th scope="col" className="text-center">Designation</th>
                                                  <th scope="col" className="text-center">Address</th>
                                                  <th scope="col" className="text-center">Update</th>
                                                  <th scope="col" className="text-center">Delete</th>

                                           </tr>
                                    </thead>
                                    <tbody>
                                           {users.map((user)=>(
                                                 <tr key={user._id}>
                                                         <td className="text-center"><a href='javascript:void(0);' name={user._id} onClick={PrivilegeUser}>&#10012;</a></td>
                                                         <td className="text-center">{user.entryDate}</td>
                                                         <td className="text-center">{user.name}</td>
                                                         <td className="text-center">{user.username}</td>
                                                         <td className="text-center">{user.adminStatus}</td>
                                                         <td className="text-center">{user.designation}</td>
                                                         <td className="text-center">{user.address}</td>
                                                         <td className="text-center"><a href='javascript:void(0);' name={user._id} onClick={EditUsers}>&#128393;</a></td>
                                                         <td className="text-center"><a href='javascript:void(0);' name={user._id} onClick={DeleteUserData}>&#10060;</a></td>
                                                         
                                                 </tr>
                                          ))}
                                    </tbody>

                            </table>
                            

                            
                            

                            
                     
                     
                     </section>

                     
                    <a href={url_prev}>Prev</a> <a href={url_next}>Next</a>
              </div>
            </div>
         
             
                 
                     
             

                 
                           
             
         
     </>);
}






export default function AdminUsers(){
       
     return(
     
       
       <>
         <Helmet>
                <html lang="en"/>
                <title>Add Admin Users</title>
                <meta name="description" content="Add Admin Users"/>
                <body className="background-lightgoldenrodyellow"/>
            </Helmet> 
         <div className="container-fluid">
             <AddAdminUser/>
         </div>
         
        </>);
}