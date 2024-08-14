import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Admin from '../admin/Admin';


const AdminRouters = () => {
    const location = useLocation()
    return (
        <div>
                
                <Routes>
                    {/* <Route path='/*' element={<Admin></Admin>}></Route> */}
                    {/* <Route path='/product/:productId/edit' element={<Demo></Demo>}></Route> */}
                </Routes>
          {location.pathname == "/admin" && <Admin></Admin>}

        </div>
    );
}

export default AdminRouters;
