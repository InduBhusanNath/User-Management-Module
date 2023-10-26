import * as React from "react";
import * as ReactDOM from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import AdminLogin from "./backend/admin_login";
import AdminDashboard from "./backend/admin_dashboard";
import AdminUsers from "./backend/admin_users";

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
         element:<AdminUsers/>,
      }
    ]
       
  },
   {
     path:"adminUsers",
     element:<AdminUsers/>
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
