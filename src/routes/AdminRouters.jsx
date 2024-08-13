import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Admin from '../admin/Admin';
import Demo from '../admin/components/product/Demo';

const AdminRouters = () => {
    const location = useLocation()
<<<<<<< HEAD

=======
>>>>>>> 773a0e36f14dde4ae52ff77caef2d84c8fe711bd
    return (
        <div>
                
                <Routes>
                    {/* <Route path='/*' element={<Admin></Admin>}></Route> */}
                    {/* <Route path='/product/:productId/edit' element={<Demo></Demo>}></Route> */}
                </Routes>
<<<<<<< HEAD
       
=======
          {location.pathname == "/admin" && <Admin></Admin>}
>>>>>>> 773a0e36f14dde4ae52ff77caef2d84c8fe711bd
        </div>
    );
}

export default AdminRouters;
