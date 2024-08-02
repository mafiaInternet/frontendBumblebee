import { Route, BrowserRouter as Router, Routes, useHref, useNavigate } from "react-router-dom";
import "./main.css";

import CustomerRouters from "./routes/CustomerRouters";

import AdminRouters from "./routes/AdminRouters";

const App = () => {

  return (
    <div className="App">
  <Router>
 
    
  <Routes>
   <Route path="/*" element={<CustomerRouters></CustomerRouters>}></Route>
   <Route path="/admin-home/*" element={<AdminRouters></AdminRouters>}></Route>
   
  </Routes>
 
  </Router>
  </div>
  )
};

export default App;
