import React, { Suspense } from 'react';
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerRouters from "./routes/CustomerRouters";
// import Admin from "./admin/Admin";
const Admin = React.lazy(() => import("./admin/Admin"))
const App = () => {
  return (
    <div className="App">
    <Suspense fallback={<div>Loading...</div>}>
    <Router>
        <Routes>
          <Route
            path="/*"
            element={<CustomerRouters></CustomerRouters>}
          ></Route>
          <Route path="/admin/*" element={<Admin></Admin>}></Route>
        </Routes>
      </Router>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="light"
      />
    </Suspense>
     
    </div>
  );

};

export default App;
