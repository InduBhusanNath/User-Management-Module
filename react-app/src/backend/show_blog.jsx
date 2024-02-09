import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
let params=new URLSearchParams(document.location.search);
let id=params.get("id");

     

export default function ShowBlog(){
    
    const [eBlog_Id,setEblog_Id]=useState(id);
    const [eBlogDate,setEBlogDate]=useState('');    
    const [eBlogTitle,setEBlogTitle]=useState(''); 
    const [eblogMetaDescription,setEblogMetaDescription]=useState('');
    const [eBlogHeading,setEBlogHeading]=useState('');
    const [eBlogImagePath,setEBlogImagePath]=useState('');
    const [eBlogAuthor,setEBlogAuthor]=useState('');
    const [eBlogBody,setEBlogBody]=useState('');
    const [msg1,setMsg1]=useState('');
    const [isBlogContentShown,setisBlogContentShown]=useState('hidden');
    const [message,setMessage]=useState('');
    
    const [editImageFile,setEditImageFile]=useState('');

    

     useEffect(()=>{
             axios.get('/adminDashboard/blogs/show_blog/?blgId='+id)
             .then(response=>{
                   
                   
                   setEBlogTitle(response.data.blogTitle);
                   setEblogMetaDescription(response.data.blogMetaDescription);
                   setEBlogHeading(response.data.blogHeading);
                   setEBlogAuthor(response.data.blogAuthor);
                   setEBlogBody(response.data.blogBody);
            })
             .catch(error=>{
                   setMsg1("Something Went Wrong, Please Try Again.....");
            });
       },[]);




     function BlogContent(){
          return(<>
                   
                         <div className="row">
                               <div className="col-sm-2"></div>
                               <div className="col-sm-10">
                                {eBlogHeading}
                               <br/>
                                {eBlogImagePath}
                               <br/>
                               <img src={eBlogImagePath}/>
                               <br/>
                                {eBlogDate}
                                <br/>
                                {eBlogAuthor}
                                <br/>
                                {eBlogBody}
                                </div>
                               <div className="col-sm-2"></div>
                         </div>
                   
          
          </>);      
  }
  function imageChange(e){
       setEditImageFile(e.target.files[0]);       
  }

  function deleteBlogImage(e){
       e.preventDefault();
       var dltImg=new FormData();
       dltImg.append('delete_blogImage',eBlogImagePath);
       dltImg.append('delete_imageId',eBlog_Id);

       
                   axios.post("delete-blog-image",dltImg,{
                         headers: {
                               'Content-Type': 'application/json'
                         }
                   }).then(response=>{
                         setMsg1(response.data);
                   }).catch(error=>{
                         setMsg1("Something Went Wrong, Please Try Again.....");
                   });     
                  
       

  }
  

  
  function updateBlogImage(e){
       e.preventDefault();
       if(!editImageFile){           
             setMsg1("Image Field Cannot Be Blank.....");
             return;
       }else{
            var edtImg=new FormData();
            edtImg.append('edit_n_blogpic',editImageFile);
            edtImg.append('original_image_path',eBlogImagePath);
            edtImg.append('eImgEdtId',eBlog_Id);
             
                   axios.post("update-blog-image",edtImg,{
                         'Content-Type': 'multipart/form-data'
                   }).then(response=>{
                         setMsg1(response.data);
                   }).catch(error=>{
                          setMsg1("Something Went Wrong, Please Try Again.....");
                  });
            
       }

  }

  function updateBlogContent(e){
       e.preventDefault();
       var updtBlg=new FormData();
       updtBlg.append('ublgId',eBlog_Id); alert(updtBlg.get('ublgId'))
       updtBlg.append('edit_n_blogTitle',eBlogTitle);
       updtBlg.append('edit_n_blogMetaDescription',eblogMetaDescription);
       updtBlg.append('edit_n_blogHeading',eBlogHeading);
       updtBlg.append('edit_n_blogAuthor',eBlogAuthor);
       updtBlg.append('edit_n_blogBody',eBlogBody);
     
       
             axios.post("update-blog-content",updtBlg,{
                    headers: {
                         'Content-Type': 'application/json'
                }
             })
            .then(response=>{
                   setMessage(response.data);
            })
             .catch(error=>{
                  setMessage(error);

            });

            

  }

  function deleteBlogContent(e){
       e.preventDefault();
       var dltBlg=new FormData();
       dltBlg.append('dltBlgId',eBlog_Id);
       axios.post("delete-blog-content",dltBlg,{             
                  headers: {
                        'Content-Type': 'application/json'
                  }    
            
       })
       .then(response=>{
            setMessage(response.data);
     })
      .catch(error=>{
           setMessage(error);

     });
       

  }

  
  

  function EditBlog(){   
       
      return(<>  
                               
             <div className="row">
                   <div className="col-sm-2"></div>
                   <div className="col-sm-10">
                        <section>
                              <span className="small text-danger">{message}</span>
                        </section>

                         <section>
                              <img src={eBlogImagePath} className="img-fluid"/>
                               <br/>
                               <form method="post" onSubmit={deleteBlogImage}>
                                     <br/>
                                     <div className="form-group">
                                           <button type="submit" className="submit">Remove Image</button>
                                     </div>                  


                              </form>

                         </section>
                         <section>
                               <form method="post" onSubmit={updateBlogImage} encType="multipart/form-data">
                                    
                                     <div className="form-group">
                                           <label>Blog Picture</label>
                                           <input className="form-control" type="file" name="edit_n_blogpic" onChange={imageChange}/>
                                     </div>
                               <br/>                         

                                     <div className="form-group">
                                           <button type="submit" className="submit">Update Image</button>
                                     </div>
                               </form>
                         </section>
                         <section>
                               <form method="post" onSubmit={updateBlogContent}>
                                                                          
                                     <div className="form-group">
                                          <label>Title[Maximum 160 Characters]</label>
                                          <input type="text" className="form-control" name="edit_n_blogTitle" value={eBlogTitle} onChange={(e)=>{setEBlogTitle(e.target.value)}}/>

                                     </div>
                                     <div className="form-group">
                                           <label>Meta Desctiption[Maximum 160 Characters]</label>
                                           <textarea className="form-control" name="edit_n_blogMetaDescription" value={eblogMetaDescription} onChange={(e)=>{setEblogMetaDescription(e.target.value)}}/>

                                     </div>
                                     <br/>
                                     <div className="form-group">
                                           <label>Heading</label>
                                           <input type="text" className="form-control" name="edit_n_blogHeading" value={eBlogHeading} onChange={(e)=>{setEBlogHeading(e.target.value)}}/>
                                     </div>
                                     <br/>
                                     <div className="form-group">
                                           <label>Author</label>
                                           <input type="text" className="form-control" name="edit_n_blogAuthor" value={eBlogAuthor} onChange={(e)=>{setEBlogAuthor(e.target.value)}}/>
                                     </div>
                                     <br/>
                                     <div className="form-group">
                                           <label>Write Blog</label>
                                           <textarea className="form-control" name="edit_n_blogBody" value={eBlogBody} onChange={(e)=>{setEBlogBody(e.target.value)}}/>
                                     </div>
                                     <br/>
                                     <div className="form-group">
                                           <button type="submit" className="submit">Update Blog</button>
                                     </div>

                              </form>
                         </section>
                         <section>
                               <form method="post" onSubmit={deleteBlogContent}>

                                    <div className="form-group">
                                           <button type="submit" className="submit">Yes,Delete Blog</button>
                                     </div>

                              </form>
                         </section>
                   </div> 
                   <div className="col-sm-2"></div> 
             </div>
      </>);
  }
     
    
        
     return(<>
         <div className="container bg-light">
             <div className="row">
                   <div className="col-sm-4"><span className="small text-danger">{msg1}</span></div>
                   <div className="col-sm-4"></div>
                   <div className="col-sm-4"></div>
             </div>
             <section className={isBlogContentShown}>
                   <BlogContent/>
             </section>
             <EditBlog/>
             
             
             
               
         </div>

     </>);
}