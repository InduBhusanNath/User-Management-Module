import {Helmet} from "react-helmet";
import {useState} from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { faGear } from '@fortawesome/free-solid-svg-icons';
import {faHouse} from '@fortawesome/free-solid-svg-icons';
import React from 'react';  
import { Link } from "react-router-dom";
import { Outlet,useParams} from "react-router-dom";





import AdminUsers from "./admin_users";
import { useEffect } from "react";



  


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
                    <td className="bg-transparent"><FontAwesomeIcon icon={faHouse} />&nbsp;<Link to="/adminDashboard/" className="action">DASHBOARD</Link></td>                                 
                </tr>
            </tbody>
            <button className="collapse_button w-75" onClick={Settings}><FontAwesomeIcon icon={faGear}/>&nbsp;Settings</button><span className="text-end w-25">{togle}</span>
                 <section className={display}>
                     <section className="text-left">
                         <span className="bg-transparent"><FontAwesomeIcon icon={faUsers}/>&nbsp;<Link to="/adminDashboard/adminUsers/" className="action">Users</Link></span>
                         
                     </section>
                     
                 </section>   
                         
                        
        </table>
     
     </>);

   }

function UserLogin(){
     let urlParams=new URLSearchParams(window.location.search);
     var sesId=urlParams.get('session');
     axios.get("admin_session")
     .then(response=>{
        alert(response.data)
     })
     .catch(error=>{
        alert(error);
     });
     
    return(<>
    
    </>);
}

function AdmBody(){
    return(<>
         <Outlet/>
    </>);

}


export default function AdminDashboard(){
     return(
         <> 
            <Helmet>
                <html lang="en"/>
                <title>Admin Dashboard</title>
                <meta name="description" content="Admin Dashboard Page"/>
                <body className="background-lightgoldenrodyellow"/>
            </Helmet>
             <div className="container-fluid">
                 <div className="row">
                     <div className="col-sm-3">
                         <section name='admSidebar' className="padding10 background-palegoldenrod shadow-sm">
                              <p className="text-center font font22">ADMIN</p>
                              <AdmSidePanel/>

                         </section>                 

                     </div>
             
                    <div className="col-sm-9">
                         <div className="row">
                            <div className="col-sm-12">
                                 <UserLogin/>
                            </div>
                         </div>
                         <section>
                             <AdmBody/>
                         </section>

                         

                    </div>                

             
                 </div>       
    
             </div>

         </>        
     );
}