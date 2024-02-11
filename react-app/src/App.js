import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminLogin from "./backend/admin_login";
import AdminDashboard from "./backend/admin_dashboard";
import AdminUsers from "./backend/admin_users";
import ForgotPassword from "./backend/forgot_password";
import Blog from "./backend/blogs";
import WriteBlog from "./backend/write_blog";
import ShowBlog from "./backend/show_blog";
import ContactUs from "./frontend/contactus";
import MessagesContactUs from "./backend/contactus_messages";

const router=createBrowserRouter([
  {
     path:"/adminLogin",
     element:<AdminLogin/>
  },  
  {
    path: "/adminDashboard",
    element: <AdminDashboard/>,
    children:[
      {
         path:"/adminDashboard/adminUsers/",
         element:<AdminUsers/>
      },
      {
        path:"/adminDashboard/blogs/",
        element:<Blog/>

      },
      {
         path:"/adminDashboard/blogs/write_blog/",
         element:<WriteBlog/>

      },      
      {  path:"/adminDashboard/blogs/show_blog/",
         element:<ShowBlog/>
      },
      {  
         path:"/adminDashboard/contactus-messages/",
         element:<MessagesContactUs/>

      }

    ]
       
  },
   {
      path:"/contactus",
      element:<ContactUs/>
   },
    {
     path:"/forgotPassword",
     element:<ForgotPassword/>
   }
   
]);

function App() {
  return (
    <>
       
         <React.StrictMode>
             <RouterProvider router={router} />
         </React.StrictMode>

    
    </>
    
  )
}

export default App;
