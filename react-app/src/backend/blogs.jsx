import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";





function Header(){
     return(<>
        <div className="row">
             <div className="col-sm-3"></div>
             <div className="col-sm-3"><h1>Blogs</h1></div>
             <div className="col-sm-3"></div>
        </div>
    </>);
}

function BlogList(){
     const [message,setMessage]=useState('');
     const [blogList,setBlogList]=useState([]);
     const [lastPage,setLastPage]=useState('');
     const [blogCount,setBlogCount]=useState('');

    
     const [id]=useState('id');    
    
     
     let params=new URLSearchParams(document.location.search);
     let pg=params.get("page");

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

      
     
         
      
          
          
     
     
     
     
     
        

      
     
     var blogId=new FormData();
     blogId.append("id",id);
      useEffect(()=>{
          axios({
               method:"get",
               url:"/adminDashboard/blogs/?page="+pg                    
            }).then(response=>{
                    var blogData=response.data;
                    setBlogList(blogData.data);
                    setLastPage(blogData.totalPages);
                    
                              
                    
                    
            }).catch(error=>{
                    setMessage("Could Not Load Blogs, Somewthing Went Wrong.....");
            });

      },[]);
     
     
        
         const showBlogs=blogList.map(blg=>
          <tr><td className="text-center">{blg.blogDate}</td><td className="text-center">{blg.blogHeading}</td><td>{blg.blogAuthor}</td><td className="text-center"><Link to={"show_blog/?"+id+"="+blg._id}>&#128065;</Link></td></tr> );  
     
     
        
        

     return(<>
         
        <div className="row">
            <Link to="/adminDashboard/blogs/write_blog/">Write Blog</Link>
            
            <span className="small text-danger">{message}</span>

        </div>

        <div className="row">
             <div className="col-sm-3"></div>
             <div className="col-sm-6">
             <span className="font font12">Total Blogs:{blogCount}</span>
                     <table className="table table-hover">
                         <thead>
                            <tr>
                                    <th scope="col" className="text-center">DATE</th>
                                    <th scope="col" className="text-center">HEADING</th> 
                                    <th scope="col" className="text-center">AUTHOR</th> 
                                    <th scope="col" className="text-center">VIEW</th>                                
                            </tr>
                        </thead>
                        

                        <tbody> 
                             {showBlogs}
                             
                                                

                        </tbody>

                     </table>   
                     <a href={firstUrl}>First Page</a> &nbsp;&nbsp; <a href={prevUrl}>&laquo;Prev</a> &nbsp;&nbsp;<a href={nextUrl}>Next&raquo;</a> &nbsp;&nbsp;<a href={lastUrl}>Last Page</a> 
            
                    

                    
              
             </div>
             <div className="col-sm-3"></div>

        </div>
     </>);
    
}



export default function Blog(){
     
     
     return(<>
         <div className="container bg-light">
             <Header/>
             <BlogList/>

         </div>
        
    </>);
}