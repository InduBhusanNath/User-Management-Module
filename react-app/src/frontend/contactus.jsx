import axios from "axios";
import { useState } from "react";

const current = new Date();
    const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;
    //`${current.getFullYear()}-${current.getMonth()+1}-${current.getDate()}`

    



//Components
function ContactUsMessage(){
     const [ms1,setMs1]=useState('');
     const [msgdate]=useState(date);
     const [name,setName]=useState('');
     const [contactNo,setContactNo]=useState('');
     const [email,setEmail]=useState('');
     const [message,setMessage]=useState('');

     function submitContactUsMessage(e){
        e.preventDefault();
        if(!name){
             setMs1("Enter Your Name.....");
             return;
        }else if(!contactNo){
             setMs1("Enter Your Conatct No.....");
             return;
        }
         
         var cumsg=new FormData();
         cumsg.append('n_date',msgdate);
         cumsg.append('n_name',name);
         cumsg.append('n_contactno',contactNo);
         cumsg.append('n_email',email);
         cumsg.append('n_message',message);

         
         
         axios.post("/contact-us-message",cumsg,{
            headers: {
                'Content-Type': 'application/json'
             }  
         })
         .then(response=>{
             setMs1(response.data);
             return;
         })
         .catch(error=>{
             setMs1(error);
             return;
         });
        
   }
     return(<>
         <div className="col-sm-12">
             <span className="small text-danger">{ms1}</span>
             <form method="post" onSubmit={submitContactUsMessage}>
                <div className="form-group">                     
                     <input type="text" className="form-control" name="n_date" value={msgdate}/>
                 </div>
                 
                 <div className="form-group">
                     <label>Name</label>
                     <input type="text" className="form-control" name="n_name" value={name} onChange={(e)=>{setName(e.target.value)}}/>
                 </div>
                 <div className="form-group">
                     <label>Mobile No</label>
                     <input type="text" className="form-control" name="n_contactno" value={contactNo} onChange={(e)=>{setContactNo(e.target.value)}}/>
                 </div>
                 <div className="form-group">
                     <label>EMail</label>
                     <input type="email" className="form-control" name="n_email" value={email} onChange={(e)=>{setEmail(e.target.value)}}/>
                 </div>
                 <div className="form-group">
                     <label>Message</label>
                     <textarea className="form-control" name="n_message" value={message} onChange={(e)=>{setMessage(e.target.value)}}/>

                 </div>
                 <div className="form-group">
                     <button type="submit" className="submit">Send Message</button>
                 </div>

            </form>
             
        </div>
     
     </>);
}

export default function ContactUs(){
    return(<>
          <div className="container-fluid">
                 <ContactUsMessage/>
          </div>
    
    </>);
}