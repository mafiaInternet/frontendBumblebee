import React from 'react';
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Admin from '../admin/Admin';
import Demo from '../admin/components/product/Demo';

const AdminRouters = () => {
    const location = useLocation()

    return (
        <div>
                
                <Routes>
                    {/* <Route path='/*' element={<Admin></Admin>}></Route> */}
                    {/* <Route path='/product/:productId/edit' element={<Demo></Demo>}></Route> */}
                </Routes>
       
        </div>
    );
}

export default AdminRouters;
