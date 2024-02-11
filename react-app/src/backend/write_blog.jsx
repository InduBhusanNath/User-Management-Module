import { useState } from "react";
import axios from "axios";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


const current = new Date();
const date = `${current.getDate()}/${current.getMonth()+1}/${current.getFullYear()}`;






export default function WriteBlog(){
     const [mesWriteBlog,setMesWriteBlog]=useState('');
     const [blogTitle,setBlogTitle]=useState('');
     const [blogMetaDescription,setBlogMetaDescription]=useState('');
     const [blogDate]=useState(date);
     const [blogHeading,setBlogHeading]=useState('');
     const [blogAuthor,setBlogAuthor]=useState('');
     const [blogBody,setBlogBody]=useState('');
     const [imageFile,setImageFile]=useState('');

     function checkBlogTitle(e){
         setBlogTitle(e.target.value);            
         if(blogTitle.length>60){
             setMesWriteBlog("Limit the Title to 60 Characters.....");
         }else{
             setMesWriteBlog(blogTitle.length);
        }

     }

     function checkMetaDescription(e){
         setBlogMetaDescription(e.target.value);
         if(blogMetaDescription.length>160){
             setMesWriteBlog("Limit the Meta Description to 160 Characters.....");
         }else{
             setMesWriteBlog(blogMetaDescription.length);
         }
     }

     function ComposeBlog(e){
        e.preventDefault();
        if(!blogDate){
             setMesWriteBlog('Error in Finding Date,Please Try Again.....');
             return;
        }
        if(!blogHeading){
             setMesWriteBlog('Type Heading.....');
             return;
        }
        if(!blogBody){
             setMesWriteBlog('Type Blog Content.....');
             return;
        }

        var blogWrite=new FormData();
        blogWrite.append("n_blogTitle",blogTitle);
        blogWrite.append("n_blogMetaDescription",blogMetaDescription);
        blogWrite.append("n_blogDate",blogDate);
        blogWrite.append("n_blogpic",imageFile);
        blogWrite.append("n_blogHeading",blogHeading);
        blogWrite.append("n_blogAuthor",blogAuthor);
        blogWrite.append("n_blogBody",blogBody);
       
        axios.post("create_blog",blogWrite,{
            headers: {
              'Content-Type': 'multipart/form-data'
            }}).then((response)=>{
                setMesWriteBlog(response.data);
        }).catch((error)=>{
             setMesWriteBlog(error);
        });
        
        
     
        


     

        

        


        
           
        
        
    }
     
     
     return(<> 
     
     
     
     <div className="container">
             <div className="row">
                 <div className="col-sm-1"></div>
                 <div className="col-sm-10">
                 
                     
                     <h1>Write Blog</h1>
                     <span className="text-danger small">{mesWriteBlog}</span> 
                     <form method="post" onSubmit={ComposeBlog} encType="multipart/form-data">
                         <div className="form-group">
                             <label>Title[Maximum 160 Characters]</label>
                             <input type="text" className="form-control" name="n_blogTitle" value={blogTitle} onChange={checkBlogTitle}/>

                         </div>
                         <div className="form-group">
                             <label>Meta Desctiption[Maximum 160 Characters]</label>
                             <textarea className="form-control" name="n_blogMetaDescription" value={blogMetaDescription} onChange={checkMetaDescription}/>

                         </div>                         
                         <div className="form-group">
                            <input type="text" className="form-control" name="n_blogDate" value={blogDate}/>
                         </div>
                         <br/>
                         <div className="form-group">
                             <label>Blog Picture</label>
                             <input className="form-control" type="file" name="n_blogpic" onChange={(e)=>{setImageFile(e.target.files[0])}}/>

                         </div>
                         <br/>
                         <div className="form-group">
                             <label>Heading</label>
                             <input type="text" className="form-control" name="n_blogHeading" value={blogHeading} onChange={(e)=>{setBlogHeading(e.target.value)}}/>
                         </div>
                         <div className="form-group">
                             <label>Author</label>
                             <input type="text" className="form-control" name="n_blogAuthor" value={blogAuthor} onChange={(e)=>{setBlogAuthor(e.target.value)}}/>
                         </div>
                         <br/>
                         <div className="form-group">
                             <label>Write Blog</label>
                             <ReactQuill theme="snow" value={blogBody} onChange={(value)=>{setBlogBody(value)}}/>
                             <textarea className="form-control" value={blogBody} name="n_blogBody" onChange={(e)=>{setBlogBody(e.target.value)}}/>
                         </div>
                         <br/>

                         <div className="form-group">
                             <button type="submit" className="submit">Create Blog</button>
                        </div>
                        

                        
                        
                     </form>
                 </div>
                 <div className="col-sm-1"></div>
             </div>
         </div>
     
     </>);
}