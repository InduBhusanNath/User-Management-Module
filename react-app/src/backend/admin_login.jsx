import {Helmet} from "react-helmet";
import {useState} from "react";
import axios from "axios";





export default function AdminLogin(){
    const [adminEmail,setAdminEmail]=useState("");
    const [errorAdminEmail, setErrorAdminEmail]=useState("");
    const [adminPassword,setAdminPassword]=useState("");
    const [errorAdminPassword,seterrorAdminPassword]=useState("");
    const [passwordType,setPasswordType]=useState("password");
    const [checked, setChecked]=useState(false);
    const [res,setRes]=useState('');
    const [sessionUserId, setSessionUserId]=useState('');
    const [sessionAdminStatus,setSessionAdminStatus]=useState('');

     
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
                 var sessionId=admUserData.sessionId;
                setRes("Allowing Access.....");
                setTimeout(()=>{
                    window.location.assign("adminDashboard?session="+sessionId);
                },2000);
                return;
                
                

             }else if(admUserData.flag=="0"){
                  setRes("No Combination of Such Username/Password.....");
                  return;
             }else if(admUserData.flag=="1+"){
                  setRes("Duplicate Username Suspected.....");
                  return;
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
                     <div className="col-sm-4"></div>
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
                         <p>&nbsp;</p>
                         <section className="background-lemonchiffon border border-warning rounded shadow-sm">
                             <p>&nbsp;</p>
                             <h1>ADMIN LOGIN</h1>
                             <p>&nbsp;</p>
                             <span className="text-danger small">{res}</span>
                             <form onSubmit={HandleSubmit}>
                                 <div className="form-group">                        
                                     <label>EMail</label>
                                     <input type="email" className="form-control" name="n_adminEmail" value={adminEmail} onChange={(e)=>{setAdminEmail(e.target.value)}}/>
                                     <span className="text-danger small">{errorAdminEmail}</span>
                                 </div>
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
                        
                     </div>
                     <div className="col-sm-4"></div>
                 </div>


            </div>
         </>
     );
}