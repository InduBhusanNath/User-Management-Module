import {Helmet} from "react-helmet";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import {faBlog} from '@fortawesome/free-solid-svg-icons';
import {faEnvelopesBulk} from '@fortawesome/free-solid-svg-icons';


import React from 'react';  
import { Link } from "react-router-dom";
import { Outlet} from "react-router-dom";
import axios from "axios";
import AdminUsers from "./admin_users";
import { useEffect } from "react";

function TechnicalSeo(){
    return(<>
       <Helmet>
               <html lang="en"/>
               <title>Admin Dashboard</title>
               <meta name="description" content="Admin Dashboard Page"/>
               <body className="background-lightgoldenrodyellow"/>
           </Helmet>
    </>);
}


     function AdmSidePanel(){
        const [togle,setTogle]=useState('+');
        const [display,setDisplay]=useState('hidden')
        function Settings(){
            if(togle=='+'){
                setTogle('-');
                setDisplay('visible');
            }else{
                setTogle('+');
                setDisplay('hidden');
            }
           
         }
         return(<>
            <table className="table font font20">
                <tbody>
                    <tr>
                         <td className="bg-transparent"><FontAwesomeIcon icon={faHouse}/>&nbsp;<Link to="/adminDashboard/" className="action">DASHBOARD</Link></td>                                 
                    </tr>
                    <tr>
                         <td className="bg-transparent"><FontAwesomeIcon icon={faBlog}/>&nbsp;<Link to="/adminDashboard/blogs/" className="action">Blogs</Link></td> 
                    </tr>
                    <tr>
                         <td className="bg-transparent"><FontAwesomeIcon icon={faEnvelopesBulk}/>&nbsp;<Link to="/adminDashboard/contactus-messages/" className="action">Contact Us Messages</Link></td> 
                    </tr>
                </tbody>
                <button className="collapse_button w-75" onClick={Settings}><FontAwesomeIcon icon={faGear}/>&nbsp;Settings</button><span className="text-end w-25">{togle}</span>
                     <section className={display}>
                         <section className="text-left">
                             <span className="bg-transparent"><FontAwesomeIcon icon={faUsers}/>&nbsp;<Link to="/adminDashboard/adminUsers/" className="action">Users</Link></span>
                             <br/>
                             test                           
                             
                         </section>
                         
                     </section>   
                             
                            
            </table>
         
         </>);
    
       }
     
     

function AdmBody(){
    const [sessionUsername,setSessionUsername]=useState('');
    const [sessionName,setSessionName]=useState('');
    const [sessionDesignation,setSessionDesignation]=useState('');
    const [sessionAdminStatus,setSessionAdminStatus]=useState('');
    const [sessionAddress,setSessionAddress]=useState('');
    const [profileDropdownVisibility,setProfileDropdownVisibility]=useState('hidden');
    const [displayChangePasswordForm,setDisplayChangePasswordForm]=useState('hidden');
    const [newPassword,setNewPassword]=useState('');
    const [showPassword,setShowPassword]=useState('password');
    const [errorChangePassword,setErrorChangePassword]=useState('');
    const [checked,setChecked]=useState(false);
    const [resPwdChg,setResPwdChg]=useState('');
    const [admLogOutRes,setAdmLogOutRes]=useState('');

    
    

     
     axios.get("/admin_session")
     .then(response=>{        
         var sesData=response.data;
         sesData.map((ses)=>{
            setSessionUsername(ses.username);
            setSessionName(ses.name);
            setSessionDesignation(ses.designation);
            setSessionAdminStatus(ses.adminStatus);
            setSessionAddress(ses.address);            
         }
            
         );
     })
     .catch(error=>{
        alert(error);
     });
     
     {/*Show the Dropdown Menu */}
     function ShowDropdown(){
         setProfileDropdownVisibility('shown');
     }
    {/* Hide the Dropdown Menu*/}
     function HideDropdown(){
         setProfileDropdownVisibility('hidden');
         
     }
     {/*Display Change Password Form*/}
      function ShowHideChangePassword(){
          if(displayChangePasswordForm=='hidden'){
              setDisplayChangePasswordForm('shown');
          }else{
              setDisplayChangePasswordForm('hidden');
          }
      }
      
       {/*Show Password in Text*/}
       function ShowPwd(props){   
              var isChecked=props.checked;
               alert(isChecked);
              if(isChecked){
                return setShowPassword('text');
              }else {
                return setShowPassword('password');
              }
           
              
           
       }
       {/* Submit Form*/}
        function SubmitChangePassword(e){
             e.preventDefault();
             if(!newPassword){                
                 setResPwdChg("Type Your New Password.....");
                 return;
             }
              var pwdChg=new FormData();
              pwdChg.append('n_chgpwdusername',sessionUsername);
              pwdChg.append('n_updatePassword',newPassword)
              
              axios({
                     method:"post",
                     url:"change_password_by_user",
                     data:pwdChg,
                     headers:{'Content-Type':'application/json'}
              })
              .then(response=>{
                 setResPwdChg(response.data);
              
              })
              .catch(error=>{
                setResPwdChg(error);
              });

        }

        function AdmLogOut(){
                       axios.get("admin_logout")
                       .then(response=>{
                        var admLogOutRes=response.data;
                        if(admLogOutRes=='1'){
                             setTimeout(()=>{
                                window.location.assign("adminLogin");
                             },1000);
                             return;
                        }else if(admLogOutRes=="-1"){
                            setAdmLogOutRes("Could Not Log Out, Please Try Again.....");
                             return;
                        }
                         
        
                    })
                    .catch(error=>{
        
                    });

        }
        
     
    return(<>
         
             <div className="container">
                
                <div className="row height15">
                     <div className="col-sm-4"></div>
                     <div className="col-sm-4"></div>
                     <div className="col-sm-4">
                     <a href="javascript:void(0);" className="text-decoration-none text-dark fw-bold" onClick={ShowDropdown}>{sessionName}&nbsp;&#9660;</a> 
                     &nbsp; <a href="javascript:void(0);" className="text-decoration-none text-dark font font18" onClick={AdmLogOut}>LogOut</a><span className="small text-danger">{admLogOutRes}</span>
                     {/*Dropdown*/}
                     <section className={profileDropdownVisibility}>
                        
                             <section className="dropdown font font18">
                                 <button onClick={HideDropdown}>&#10060;</button>
                                 <br/>
                                 <table className="table">
                                     <tbody>
                                         <tr>
                                             <td className="bg-transparent">NAME</td>
                                             <td className="bg-transparent">{sessionName}</td>
                                         </tr>
                                         <tr>
                                             <td className="bg-transparent">USERNAME</td>
                                             <td className="bg-transparent">{sessionUsername}</td>
                                         </tr>
                                          <tr>
                                             <td className="bg-transparent">DESIGNATION</td>
                                             <td className="bg-transparent">{sessionDesignation}</td>
                                         </tr>
                                         <tr>
                                             <td className="bg-transparent">ADMIN STATUS</td>
                                             <td className="bg-transparent">{sessionAdminStatus}</td>
                                         </tr>
                                         <tr>
                                             <td className="bg-transparent">ADDRESS</td>
                                             <td className="bg-transparent">{sessionAddress}</td>
                                         </tr>
                                    </tbody>

                                 </table>
                                 {/*Password Change*/}
                                 <section>
                                    <a href="javascript:void(0);" className="text-dark text-decoration-none fw-bold" onClick={ShowHideChangePassword}>Change Password</a>
                                    {/*Password Form*/}
                                    <br/>
                                    <span className="small text-danger">{resPwdChg}</span>
                                    <section className={displayChangePasswordForm}>
                                         <form method="post" onSubmit={SubmitChangePassword}>
                                             <div className="form-group">  
                                                 <input type="text" className="form-control" name="n_chgpwdusername" value={sessionUsername}/>
                                             </div>
                                             <div className="form-group">
                                               <label>Type New Password</label>
                                               <input type={showPassword} className="form-control" name="n_updatePassword" value={newPassword} onChange={(e)=>{setNewPassword(e.target.value)}}/>
                                               <span className="text-danger small">{errorChangePassword}</span>       
                                             </div>
                                             <div className="form-check">
                                                  <input type="checkbox" className="form-check-input" onChange={(e)=>{setChecked(e.target.checked)}} onClick={ShowPwd}/>
                                                 <label className="form-check-label">Show Password</label>

                                             </div>
                                             <div class="form-group">
                                                 <button type="submit" class="submit">CHANGE PASSWORD</button>
                                             </div>
                                         </form>
                                    </section>
                                 </section>

                             </section>
                             
                        
                     </section>

                     </div>
                </div>

            </div>
             
            <div className="row">
                 <div className="col-sm-3 padding25">
                     <AdmSidePanel/>
                </div>
                <div className="col-sm-9 padding25">                    
                    <Outlet/>                    
                </div>
            </div>
            

         
    </>);

}






export default function AdminDashboard(){
     return(<>
         <TechnicalSeo/>
         <AdmBody/>
     </>);
}