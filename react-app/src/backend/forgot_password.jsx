import {Helmet} from "react-helmet";
import {useState} from "react";
import {useEffect} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import axios from "axios";

function HandleSubmit(){
    alert("Hi");
}

function SendUserId(){
     const [res,setRes]=useState('');
     const [errorAdminEmail,setErrorAdminEmail]=useState('');
     const [adminEmail,setAdminEmail]=useState('');
     return(<>
        <Helmet>
                <html lang="en"/>
                <title>Admin Login</title>
                <meta name="description" content="Admin Login Page"/>
                <body className="background-lightgoldenrodyellow"/>
         </Helmet>
        <div className="container">
            <div className="row">
                 <div className="col-sm-4">1</div>
                 <div className="col-sm-4">2</div>
                 <div className="col-sm-4">3</div>
             </div>
             <div className="row">
                 <div className="col-sm-4">1</div>
                 <div className="col-sm-4">
                     <section>
                     <span className="text-danger small padding10">{res}</span>
                             <form onSubmit={HandleSubmit}>
                                 <div className="form-group">                        
                                     <label>EMail</label>
                                     <input type="email" className="form-control" name="n_adminEmail" value={adminEmail} onChange={(e)=>{setAdminEmail(e.target.value)}}/>
                                     <span className="text-danger small">{errorAdminEmail}</span>
                                 </div>
                                 <br/>                                 
                                 
                                 <div className="form-group">
                                     <button  type="submit" className="submit">Go</button>
                                 </div>

                                 
                             </form>
                     </section>
                 </div>
                 <div className="col-sm-4">3</div>
                
             </div>
        </div>
     </>);
}


export default function ForgotPassword(){
     return(<>
           <SendUserId/>          
     </>);
}