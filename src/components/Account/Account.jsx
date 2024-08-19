import { Box, Grid, Paper, styled } from "@mui/material";
import React, { useEffect, useState } from "react";
import MyOrder from "./components/Order";
import {
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Infomation from "./components/Infomation";
import Address from "./components/Address";
import { useDispatch } from "react-redux";
import { User } from "../../state/auth/Action";
import Vouchers from "./components/Vouchers";
import Dashboard from "./components/Dashboard";
import OrderInfomation from "./components/OrderInfomation";
import Order from "./components/Order";
import Review from "./components/Review";


const Item = styled(Paper)(({ theme }) => ({
  // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
  boxShadow: "none",
  padding: theme.spacing(1),
}));

const Account = () => {
  const dispath = useDispatch();
  const jwt = localStorage.getItem("jwt");
  useEffect(() => {
    if (jwt) {
      dispath(User(jwt));
    }

  }, [dispath]);
  return (
    <div className="account">
      <div className="container">
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <div className="account--nav">
              <b style={{textAlign: "center"}}>Tài khoản</b>
              <NavLink to={"/account/"}>Bảng điều khiển</NavLink>
              <NavLink to="/account/edit">Thông tin tài khoản</NavLink>
              <NavLink to="/account/address">Địa chỉ</NavLink>
              <NavLink to={`/account/order`}>Đơn hàng của tôi</NavLink>
              <NavLink to="/account/voucher">Voucher</NavLink>
              <NavLink to="/account/review">Nhận xét của tôi</NavLink>
              <NavLink to="/account/order/id">Đơn hàng</NavLink>
            </div>
          </Grid>
          <Grid item xs={12} md={9}>
            <div className="account--content">
              <Routes>
                <Route path="/" element={<Dashboard></Dashboard>}></Route>
                <Route path="/edit" element={<Infomation></Infomation>}></Route>
                <Route path="/address" element={<Address></Address>}></Route>
                <Route path="/voucher" element={<Vouchers></Vouchers>}></Route>
                <Route path={`/order`} element={<Order></Order>}></Route>
                <Route path={`/order/:name`} element={<OrderInfomation></OrderInfomation>}></Route>
                <Route path="/review" element={<Review></Review>}></Route>
                <Route
                  path="/order/id"
                  element={<OrderInfomation></OrderInfomation>}
                ></Route>
              </Routes>
            </div>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default Account;
