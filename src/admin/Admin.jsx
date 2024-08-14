import * as React from "react";

import Box from "@mui/material/Box";
import ListProduct from "./components/product/ListProduct";
import { useDispatch, useSelector } from "react-redux";

import Customers from "./components/user/Customers";
import Orders from "./components/order/Orders";

import Demo from "./components/product/Demo";

import HomeIcon from "@mui/icons-material/Home";
import { Button, Grid, Typography } from "@mui/material";

import { GetAdmin, Logout } from "../state/auth/Action";
import { Link, Route, Routes, useLocation } from "react-router-dom";

import PrimarySearchAppBar from "./components/Header";

import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CommentIcon from "@mui/icons-material/Comment";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";

import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DehazeIcon from "@mui/icons-material/Dehaze";
import OrderInfomation from "./components/order/components/OrderInfomation";
import Home from "./components/home/Home";
import ListVoucher from "./components/voucher/ListVoucher";
import AuthLogin from "../customer/auth/AuthLogin";
import Voucher from "./components/voucher/Voucher";


const text = "/admin";
const tabs = [
  {
    link: "/admin",
    icon: <HomeIcon></HomeIcon>,
    name: "Trang chủ",


  },
  {
    link: text + "/user",
    icon: <PersonIcon></PersonIcon>,
    name: "Người dùng",

  },
  {
    link: text + "/product",
    icon: <FullscreenExitIcon></FullscreenExitIcon>,
    name: "Sản phẩm",

  },
  {
    link: text + "/voucher",
    icon: <ConfirmationNumberIcon></ConfirmationNumberIcon>,
    name: "Mã giảm giá",

  },
  {
    link: text + "/order",
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    name: "Đơn hàng",

  },
  {
    link: text + "/review",
    icon: <CommentIcon></CommentIcon>,
    name: "Phản hồi",

  }
];

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: {xs: '90%', sm: '80%',  md: '70%', lg: '50%'},
  margin: '0 auto',
  bgcolor: 'background.paper',
  // border: '1px solid #000',
  p: 4,
};

const Admin = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");


  React.useEffect(() => {
    if (jwt) {
      dispatch(GetAdmin(jwt));
    }
  }, [dispatch, jwt, auth.jwt]);

  return jwt && auth.user && auth.user.role == "ADMIN" ? (
    <div className="admin">
      <Grid container className="admin--navTabs">
        <Grid item xs={2} className="admin--navTabs--link">
          <Typography
            sx={{
              display: "flex",
              justifyContent: "space-evenly",
              alignItems: "center",
              padding: "1rem 0.5rem",
            }}
          >
            <DehazeIcon
              sx={{ fontSize: "2rem", marginRight: "1rem" }}
            ></DehazeIcon>
            <Typography sx={{ fontSize: "2rem" }}>TEE LAB</Typography>
          </Typography>
          <Box sx={{display: "flex", flexDirection: "column", justifyContent: "space-between", height: "calc(100% - 5rem)"}}>
          <ul>
            {tabs.map((item, index) => (
              <li key={index}>
                <Link to={item.link}>
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <Button onClick={() => dispatch(Logout())}>Đăng xuất</Button>
          </Box>
        
        </Grid>
        <Grid item xs={10} className="admin--navTabs--page">
          <PrimarySearchAppBar></PrimarySearchAppBar>
   
          <Routes>
                    <Route path='/*' element={<Home></Home>}></Route>
                    <Route path="/user" element={<Customers></Customers>}></Route>
                    <Route path="/product" element={<ListProduct></ListProduct>}></Route>
                    <Route path="/product/create" element={<Demo></Demo>}></Route>
                    <Route path='/product/:productId/edit' element={<Demo></Demo>}></Route>
                    <Route path="/voucher" element={<ListVoucher></ListVoucher>}></Route>
                    <Route path="/voucher/create" element={<Voucher></Voucher>}></Route>
                    <Route path="/order" element={<Orders></Orders>}></Route>
                    <Route path="/order/:orderId/info" element={<OrderInfomation></OrderInfomation>}></Route>
                </Routes>


        </Grid>
      </Grid>
    </div>
  ) : <Box sx={style}>

  <AuthLogin></AuthLogin>
  </Box>
};

export default Admin;
