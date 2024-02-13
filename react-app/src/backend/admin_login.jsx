import {Helmet} from "react-helmet";
import {useState} from "react";
import { useEffect } from "react";
import { useRef} from "react";
import parse from 'html-react-parser';
import axios from "axios";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';


 


export default function AdminLogin(t){
    const [adminEmail,setAdminEmail]=useState("");
    const [errorAdminEmail, setErrorAdminEmail]=useState("");
    const [adminPassword,setAdminPassword]=useState("");
    const [errorAdminPassword,seterrorAdminPassword]=useState("");
    const [passwordType,setPasswordType]=useState("password");
    const [checked, setChecked]=useState(false);
    const [res,setRes]=useState('');
    const [autousr,setAutousr]=useState('');
    const [sessionUserId, setSessionUserId]=useState('');
    const [sessionAdminStatus,setSessionAdminStatus]=useState('');
    
   
    

    function getAutoAdmin(){        
             let xhr=new XMLHttpRequest();
             xhr.open('GET',"/adminLogin/create-auto-admin",true);
             xhr.send();
             xhr.onload=()=>{ 
                             var m=parse(xhr.response);
                             setAutousr(m);
                        }
     }
    
 
     
     
     
     
    

     
     

     
    {/* Show/Hide Password*/}
    function ShowPassword(e){
         
         e.preventDefault();
         
         if(passwordType==='password'){ 
            
            setChecked(!checked);
             setPasswordType('text');
             

             return;
         }
         setPasswordType('password');
         setChecked(checked);        
    }
    {/*Submit Form */}
     function HandleSubmit(e){
        {/*Validation */}
         e.preventDefault();
         if(!adminEmail){
             setErrorAdminEmail('Please Type Your Username.....');
             return;
         }
         var pwd=adminPassword;
         if(pwd.length==0){
            seterrorAdminPassword("Please Enter Your Password.....");
            return;
         }

         var adm_usr=new FormData();
         adm_usr.append('userName',adminEmail);
         adm_usr.append('userPassword',adminPassword);
         axios({
              method:"post",
              url:"check_admin_user",
              data:adm_usr,
              headers:{'Content-Type':'application/json'}
         })
         .then(response=>{
             var admUserData=response.data;
             if(admUserData.flag=="1"){
                 
                setRes("Allowing Access.....");
                setTimeout(()=>{
                    window.location.assign("/adminDashboard");
                },2000);
                return;
                
                

             }else if(admUserData.flag=="0"){
                  setRes("No Combination of Such Username/Password.....");
                  return;
             }else if(admUserData.flag=="1+"){
                  setRes("Duplicate Username Suspected.....");
                  return;
             }else if(admUserData.flag=="0+"){
                 setRes("Type the Correct Password.....");
                 return;
             }else if(admUserData.flag=="err"){
                 setRes("Errors Detected, Please Try Again.....");
             }
            

         })
         .catch(error=>{
            setRes(error);
         });        
         
          
     }
     

     
     return(
         <> 
            <Helmet>
                <html lang="en"/>
                <title>Admin Login</title>
                <meta name="description" content="Admin Login Page"/>
                <body className="background-lightgoldenrodyellow"/>
            </Helmet>
            <div className="container">
                 {/*Header*/}
                 <div className="row">
                     <div className="col-sm-4">
                        {/* Create Dummy User for First Login*/}
                        <button className="button" onClick={getAutoAdmin}>Create Dummy Admin User</button>
                     </div>
                     <div className="col-sm-4">
                         <p>&nbsp;</p>
                         <p>&nbsp;</p>
                     </div>
                     <div className="col-sm-4">
                            
                     </div>
                 </div>
                 {/*Body*/}
                 <div className="row">
                     <div className="col-sm-4"></div>
                     <div className="col-sm-4">
                         <section>
                             <span className="text-danger small padding10">{autousr}</span>
                         </section>
                         <p>&nbsp;</p>
                         <section className="bg-transparent border border-warning rounded shadow-sm">
                             <p>&nbsp;</p>
                             
                             <h1>ADMIN LOGIN</h1>  
                             

                             <p>&nbsp;</p>
                             <span className="text-danger small padding10">{res}</span>
                             <form onSubmit={HandleSubmit}>
                                 <div className="form-group">                        
                                     <label>EMail</label>
                                     <input type="email" className="form-control" name="n_adminEmail" value={adminEmail} onChange={(e)=>{setAdminEmail(e.target.value)}}/>
                                     <span className="text-danger small">{errorAdminEmail}</span>
                                 </div>
                                 <br/>
                                 <div className="form-group">
                                     <label>Password</label>                               
                                     <input type={passwordType} className="form-control" name="n_adminPassword" value={adminPassword} onChange={(e)=>{setAdminPassword(e.target.value)}}/>
                                     <span className="text-danger small">{errorAdminPassword}</span>
                                 </div>
                                 <div className="form-check">
                                     <input type="checkbox" value={checked}  className="form-check-input" name="n_showPassword"  onChange={ShowPassword}/>
                                     <label>Show Password</label>
                                 </div>
                                 <br/>
                                 <div className="form-group">
                                     <button  type="submit" className="submit">Go</button>
                                 </div>

                                 
                             </form>
                         </section>
                         <section>
                            <br/>
                            <a href="forgotPassword" className="font font20 text-decoration-none">Forgot Password</a>
                         </section>
                        
                     </div>
                     <div className="col-sm-4"></div>
                 </div>


            </div>
         </>
     );
}