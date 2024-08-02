import React from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Admin from '../admin/Admin';

const AdminRouters = () => {
    return (
        <div>
                
                <Routes>
                    <Route path='/*' element={<Admin></Admin>}></Route>
                </Routes>
        
        </div>
    );
}

export default AdminRouters;
