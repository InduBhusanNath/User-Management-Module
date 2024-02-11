const blogModel=require('../models/blogModel.js');
const mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/mydb');
const express = require('express');
const multer=require('multer');
const fs=require("fs");
const { unlinkSync } = require('node:fs');
const path=require('node:path');




//Create Blog
function createBlog(req,res){
       req.file;
       var blog_date=req.body.n_blogDate; 
       var n_blogTitle=req.body.n_blogTitle;
       var n_blogMetaDescription=req.body.n_blogMetaDescription;
       var n_blogpic=req.file.originalname;             
       var n_blogHeading=req.body.n_blogHeading;
       var n_blogAuthor=req.body.n_blogAuthor;
       var n_blogBody=req.body.n_blogBody;
       var blog_image_path='http://localhost:5000/images/BlogImages/'+n_blogpic;    
       
            
       
       var newBlog=new blogModel({
           blogDate:blog_date,
           blogTitle:n_blogTitle,
           blogMetaDescription:n_blogMetaDescription,
           blogImagePath:blog_image_path,
           blogHeading:n_blogHeading,           
           blogAuthor:n_blogAuthor,
           blogBody:n_blogBody
       });
       
       newBlog.save().then(result=>{
            res.send("New Blog Created Successfully.....");
       }).catch(error=>{
            res.send("Could Not Create Blog, Please Try Again.....");
       });

       
 }

 

       
//Read Blog


async function readBlog(req,res){
     
      var pageNo;
      
      if(!req.query.page){
            pageNo=1;
      }else{
            pageNo=req.query.page;
      }     
 
      var totalPages;
      var pageLimit=2;
      var offset; 
      var totalBlogs;

      await blogModel.countDocuments({}).then(rows=>{
            if(rows===0){
                  res.json({
                        "flag":"0",
                        "data":[],
                        "totalPages":"0",
                        "totalBlogs":"0"
                  }); 
            }else if(rows<0){
                  res.json({
                        "flag":"-1",
                        "data":[],
                        "totalPages":"0",
                        "totalBlogs":"0"
                  });
            }else{
                  rowCount(rows);
            }
      }).catch(error=>{
            res.json({
                  "flag":"error",
                  "data":[],
                   "totalPages":"0",
                   "totalBlogs":"0"
  
                
            });
      });

       async function rowCount(rows){
             totalBlogs=rows;             
             totalPages=Math.ceil(totalBlogs/pageNo);             
             offset=(pageNo-1)*pageLimit; 
             blogModel.find({}).skip(offset).limit(pageLimit).sort({blogDate:-1})
             .then(result=>{
                  res.json({    
                        "flag":"success",
                         "data":result,
                         "totalPages":totalPages,
                         "totalBlogs":totalBlogs
                  }); 
             })
             .catch(error=>{
                  res.json({
                        "flag":"error",
                        "data":[],
                        "totalPages":"0",
                        "totalBlogs":"0"
                 });
             });


      }
      
      
      
            
          

      
} 

//Display Blog

function edit_displayBlog(req,res){
       eblgId=req.query.blgId;
       blogModel.findOne({_id:eblgId}).then(results=>{

            res.json(
                  {
                   "flag":"1",
                   "eBlog_Id":results._id,
                   "eBlogDate":results.blogDate,
                   "eBlogTitle":results.blogTitle,
                   "eBlogMetaDescription":results.blogMetaDescription,
                   "eBlogImagePath":results.blogImagePath,
                   "eBlogHeading":results.blogHeading,
                   "eBlogAuthor":results.blogAuthor,
                   "eBlogBody":results.blogBody
                  });
            
            
            
            
       }).catch(error=>{
                 res.json({"result":"Something Went Wrong, Please Try Again....."
            })
       });
       
 

        
}
//Delete Blog Image
function delete_blogImage(req,res){
       var image_to_remove=req.body.delete_blogImage;
       var id_image=req.body.delete_imageId;
       var image_to_remove_name='./public/images/BlogImages/'+path.basename(image_to_remove);
        
       try{
             unlinkSync(image_to_remove_name);
             blogModel.findByIdAndUpdate(id_image,{blogImagePath:''}).then(result=>{
                  res.send("Image Deleted.....");     
            }).catch(error=>{
                  res.send("Could Not Delete Image, Please Try Again.....");            
            });
             
       } catch(err){
            res.send("Could Not Delete Image.....");
       }
       /*
       unlink('./public/images/BlogImages/ad1.jpg',(err)=>{
            if(!err){
                  res.send("Image Successfully Deleted....");
            }else{
                  res.send("Could Not Delete Image.....");
            }

       });

       */
       

       

}

//Update Blog Image

function edit_blogImage(req,res){
      req.file;
      res.send("Image Uploaded Successfully.....");

}

//Update Blog Content
function edit_blogContent(req,res){
       var ubId=req.body.ublgId;
       var ubtitle=req.body.edit_n_blogTitle;
       var ubmetadesc=req.body.edit_n_blogMetaDescription;
       var ubheading=req.body.edit_n_blogHeading;
       var ubauthor=req.body.edit_n_blogAuthor;
       var ubbody=req.body.edit_n_blogBody;
      
      blogModel.findByIdAndUpdate(ubId,{blogTitle:ubtitle,blogMetaDescription:ubmetadesc,blogHeading:ubheading,blogAuthor:ubauthor,blogBody:ubbody})
      .then(result=>{
             res.send("Blog Successfully Updated.....");
      }).catch(error=>{
            res.send("Something Went Wrong, Please Try Again.....");
      });
      
}
      
//Delete Blog Content
function delete_blogContent(req,res){
       var dbId=req.body.dltBlgId;
       blogModel.deleteOne({_id:dbId}).then(result=>{
             res.send("Blog Deleted Successfully.....");

       })
       .catch(error=>{
             res.send(error);
       });      

}    


       
        
       



module.exports={
       createBlog:createBlog,      
       readBlog:readBlog,
       edit_displayBlog:edit_displayBlog,
       delete_blogImage:delete_blogImage,
       edit_blogImage:edit_blogImage,
       edit_blogContent:edit_blogContent,
       delete_blogContent:delete_blogContent
      
}

