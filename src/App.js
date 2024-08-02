import { Route, BrowserRouter as Router, Routes, useHref, useNavigate } from "react-router-dom";
import "./main.css";

import CustomerRouters from "./routes/CustomerRouters";
import Admin from "./admin/Admin";


const App = () => {

  return (
    <div className="App">
  <Router>
 
    
  <Routes>
   <Route path="/*" element={<CustomerRouters></CustomerRouters>}></Route>
   <Route path="/admin/*" element={<Admin></Admin>}></Route>
   
  </Routes>
 
  </Router>
  </div>
  )
};

export default App;
