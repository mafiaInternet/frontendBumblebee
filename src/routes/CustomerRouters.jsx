import React, { useEffect } from "react";
import Home from "../pages/Home";
import Policy from "../pages/Policy";
import TableSize from "../pages/TableSize";
import SystemShop from "../pages/SystemShop";
import Product from "../components/Product/Product";

import Header from "../components/Header/Header";
import Footer from "../components/Footer";
import { Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import ProductDetail from "../components/Product/components/ProductDetail";
import Cart from "../components/Cart/Cart";
import Payment from "../components/Payment/Payment";

import Account from "../components/Account/Account";

const CustomerRouters = () => {
  const location = useLocation()
  return (
    <div className="customer">

      <Header></Header>

      <Routes>
        <Route path="/login" element={<Home></Home>}></Route>
        <Route path="/register" element={<Home></Home>}></Route>
        <Route exact path="/" element={<Home></Home>}></Route>
        <Route path="/home" element={<Home></Home>}></Route>
        <Route path="/policy" element={<Policy></Policy>}></Route>
        <Route path="/table-size" element={<TableSize></TableSize>}></Route>
        <Route path="/system-shop" element={<SystemShop></SystemShop>}></Route>
        <Route path="/product/:name" element={<Product></Product>}></Route>
        <Route
          path={`/product-detail/:name`}
          element={<ProductDetail></ProductDetail>}
        ></Route>
        <Route path="/cart" element={<Cart></Cart>}></Route>
        <Route path="/account/*" element={<Account></Account>}>
        </Route>

        <Route path="/payment" element={<Payment></Payment>}></Route>
      </Routes>

      {location.pathname != "/payment" ?
        <Footer></Footer>
        : ""

      }
    </div>
  );
};

export default CustomerRouters;
