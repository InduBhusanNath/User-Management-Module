import { useState } from "react";
import {useEffect}  from "react";
import axios from "axios";


let params=new URLSearchParams(document.location.search);
     let pg=params.get("page");

     
     
      

function VisitorMessages(){
     const [delMsgId,setDelMsgId]=useState('');
     const [msg1,setMsg1]=useState('');
     const [msg2,setMsg2]=useState('');
     const [msgDetails,setMsgDetails]=useState([
          {
            _id:'',
            msgDate: '',
            msgName: '',
            msgContactNo: '',
            msgEmail: '',
            msgMessage: ''
            
          }
        ]);
     const [lastPage,setLastPage]=useState('');
     const [delPopup,setDelPopup]=useState('hidden');

     if(!pg){
          pg=1;
                     
    }else if(pg<1){
          pg=1;
    }else if(pg>lastPage){
          pg=lastPage;

    } 
     const nextUrl="?page="+(parseInt(pg)+1);         
     const prevUrl="?page="+(parseInt(pg)-1);
     const lastUrl="?page="+lastPage;
     const firstUrl="?page="+1;
     

     useEffect(()=>{
            axios.get("/adminDashboard/contactus-messages/?page="+pg)
            .then(response=>{
                     if(response.data.flag==="1"){
                          setMsgDetails(response.data.result);
                     }else if(response.data.flag==="0"){
                          setMsg1("0 Message Found.....");
                     }else if(response.data.flag==="error"){
                          setMsg1("Something Went Wrong, Please Try Again.....");
                     }
                     setLastPage(response.data.lastPage);

            })
            .catch(error=>{
                 setMsg1(error);
            });

     },[]);
 function hideDelPopup(){
     setDelPopup('hidden');
 }

 function deleteMessage(e){
      var dmsgId=e.target.name;
      setDelMsgId(dmsgId);
      setDelPopup('shown');      
      
 }

 function confirmDeleteMessage(e){ 
      e.preventDefault();
      var dltmsg=new FormData();
      dltmsg.append('n_delMsgId',delMsgId);
      
      axios.post("/adminDashboard/contactus-messages/delete-message/",dltmsg,{
           headers:{
                'Content-Type':'application/json'
          }
      })
      .then(response=>{
           setMsg2(response.data);

      })
      .catch(error=>{
          setMsg2("Error Detected.....");
      });
     
}
         
           const msgList=msgDetails.map(md=>
                <tr key={md._id}>
                     <td>{md.msgDate}</td>
                     <td>{md.msgName}</td>
                     <td>{md.msgContactNo}</td>
                     <td>{md.msgEmail}</td>
                     <td>{md.msgMessage}</td>
                     <td><a href="javascript:void(0);" name={md._id} className="text-decoration-none" onClick={deleteMessage}>&#10060;</a></td>
                                         
                </tr>
          
          );

 
      

     

     
     return(<> 
           <div className="row padding25">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                    <h1>Contact Us Messages</h1>
                </div>
                <div className="col-sm-1"></div>
           </div>
          <div className="row">
                <div className="col-sm-12">
                     <span className="small text-danger">{msg1}</span>
                </div>
          </div>
           <div className="row">
                <div className="col-sm-1"></div>
                <div className="col-sm-10">
                     <table className="table">
                          <thead>
                               <tr>
                                    <th scope="col" className="text-center">DATE</th>
                                    <th scope="col" className="text-center">VISITOR NAME</th>
                                    <th scope="col" className="text-center">CONTACT NO</th>
                                    <th scope="col" className="text-center">EMAIL</th>
                                    <th scope="col" className="text-center">MESSAGE</th>
                                    <th scope="col" className="text-center">DELETE</th>
                               </tr>
                          </thead>
                          <tbody>{msgList}
                               
                
                          </tbody>
                     </table>
                     <a href={firstUrl}>First Page</a>&nbsp;&nbsp;<a href={prevUrl}>&laquo;Prev</a>&nbsp;&nbsp;<a href={nextUrl}>Next&raquo;</a>&nbsp;&nbsp;<a href={lastUrl}>Last</a>
                     
                </div>
                <div className={delPopup}>
                     <section className="popup">
                          <a href="javascript:void(0);" className="text-decoration-none" onClick={hideDelPopup}>&#10060;</a>
                          <p>&nbsp;</p>
                          <span className="small text-danger">{msg2}</span>
                          <br/>
                          <span className="font font18">Do You Want to Delete the Message?</span>
                          <br/>
                          <form method="post" onSubmit={confirmDeleteMessage}>
                               <div className="form-group">                     
                                    <input type="text" className="form-control" name="n_delMsgId" value={delMsgId}/>
                               </div>
                               <br/>
                               <div className="form-group">
                                    <button type="submit" className="submit">Delete Message</button>
                                </div>

                          </form>
                     </section>
                </div>
                <div className="col-sm-1"></div>

          </div>
     </>);

 }


export default function MessagesContactUs(){

     
     return(<> 
           <div className="container-fluid bg-body-tertiary">
                <VisitorMessages/>
                                

           </div>
              

         
         
     </>);
}
