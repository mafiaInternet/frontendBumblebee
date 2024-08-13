import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./main.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CustomerRouters from "./routes/CustomerRouters";
import Admin from "./admin/Admin";
<<<<<<< HEAD
=======

>>>>>>> 773a0e36f14dde4ae52ff77caef2d84c8fe711bd

const App = () => {
  return (
    <div className="App">
<<<<<<< HEAD
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
    </div>
  );
=======
  <Router>
 
    
  <Routes>
   <Route path="/*" element={<CustomerRouters></CustomerRouters>}></Route>
   <Route exact path="/admin/*" element={<Admin></Admin>}></Route>
   
  </Routes>
 
  </Router>
  </div>
  )
>>>>>>> 773a0e36f14dde4ae52ff77caef2d84c8fe711bd
};

export default App;
