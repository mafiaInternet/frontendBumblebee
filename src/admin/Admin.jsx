import * as React from "react";

import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  Typography,
  Button,
  Grid,
} from "@mui/material";
import ListProduct from "./components/product/ListProduct";
import { useDispatch, useSelector } from "react-redux";
import Orders from "./components/order/Orders";
import AddProduct from "./components/product/AddProduct";
import HomeIcon from "@mui/icons-material/Home";
import { GetAdmin, Logout, User } from "../state/auth/Action";
import { Link, Route, Routes, useNavigate } from "react-router-dom";
import PrimarySearchAppBar from "./components/Header";

import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CommentIcon from "@mui/icons-material/Comment";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import OrderInfomation from "./components/order/components/OrderInfomation";
import Home from "./components/home/Home";
import ListVoucher from "./components/voucher/ListVoucher";
import AuthLogin from "../customer/auth/AuthLogin";
import Voucher from "./components/voucher/Voucher";
import ListCustomers from "./components/user/components/ListCustomer";

const text = "/admin";
const tabs = [
  {
    link: "/admin",
    icon: <HomeIcon sx={{ fontSize: "2.5rem" }}></HomeIcon>,
    name: "Trang chủ",
  },
  {
    link: text + "/user",
    icon: <PersonIcon sx={{ fontSize: "2.5rem" }}></PersonIcon>,
    name: "Người dùng",
  },
  {
    link: text + "/product",
    icon: <FullscreenExitIcon sx={{ fontSize: "2.5rem" }}></FullscreenExitIcon>,
    name: "Sản phẩm",
  },
  {
    link: text + "/voucher",
    icon: (
      <ConfirmationNumberIcon
        sx={{ fontSize: "2.5rem" }}
      ></ConfirmationNumberIcon>
    ),
    name: "Mã giảm giá",
  },
  {
    link: text + "/order",
    icon: <ShoppingCartIcon sx={{ fontSize: "2.5rem" }}></ShoppingCartIcon>,
    name: "Đơn hàng",
  },
  {
    link: text + "/review",

    icon: <CommentIcon sx={{ fontSize: "2.5rem" }}></CommentIcon>,

    name: "Phản hồi",
  },
];

const Admin = () => {
  const dispatch = useDispatch();
  const auth = useSelector((store) => store.auth);
  const jwt = localStorage.getItem("jwt");
  const navigate = useNavigate();
  const handleClick = () => {
    navigate("/");
  };

  const handleLogout = () => {
    dispatch(Logout());
    navigate("/admin/login");
  };
  React.useEffect(() => {
    if (jwt) {
      dispatch(User(jwt));
    }
  }, [jwt]);

  return jwt && auth.user && auth.user.role != null ? (
    <div className="admin">
      <Grid container className="admin--navTabs">
        <Grid
          item
          xs={2}
          sx={{ height: "inherit" }}
          className="admin--navTabs--link"
        >
          <Box sx={{height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between"}}>
            <div>
              <Typography
                onClick={handleClick}
                sx={{
                  fontSize: "30px",
                  fontWeight: "600",
                  textAlign: "center",
                  padding: "1rem 0rem",
                  cursor: "pointer",
                  "@media (max-width: 1220px)": {
                    fontSize: "20px",
                  },
                  "@media (max-width: 850px)": {
                    fontSize: "10px",
                  },
                }}
              >
                BUMBLEBEE
              </Typography>
              <List sx={{ flexGrow: "1" }}>
                {tabs.map((item, index) => (
                  <ListItem
                    button
                    key={index}
                    component={Link}
                    to={item.link}
                    sx={{
                      "&:hover": {
                        backgroundColor: "#f0f0f0",
                        color: "#1976d2",
                      },
                      borderRadius: "8px",
                      marginBottom: "8px",
                    }}
                  >
                    <ListItemIcon
                      sx={{
                        color: "inherit",
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    <Box
                      sx={{
                        fontSize: "20px",
                        "@media (max-width: 1220px)": {
                          fontSize: "15px",
                        },
                        "@media (max-width: 850px)": {
                          fontSize: "11px",
                        },
                        "@media (max-width: 670px)": {
                          display: "none",
                        },
                      }}
                    >
                      {item.name}
                    </Box>
                  </ListItem>
                ))}
              </List>
            </div>
            <Button
              onClick={() => handleLogout()}
              variant="contained"
              style={{
                width: "100%",
                padding: "12px 16px",
                fontSize: "16px",
              }}
            >
              Đăng xuất
            </Button>
          </Box>
        </Grid>
        <Grid item xs={10} className="admin--navTabs--page">
          <PrimarySearchAppBar></PrimarySearchAppBar>

          <Routes>
            <Route path="/login" element={<Home></Home>}></Route>
            <Route path="/" element={<Home></Home>}></Route>
            <Route
              path="/user"
              element={<ListCustomers></ListCustomers>}
            ></Route>
            <Route
              path="/product"
              element={<ListProduct></ListProduct>}
            ></Route>
            <Route
              path="/product/create"
              element={<AddProduct></AddProduct>}
            ></Route>
            <Route
              path="/product/:productId/edit"
              element={<AddProduct></AddProduct>}
            ></Route>
            <Route
              path="/voucher"
              element={<ListVoucher></ListVoucher>}
            ></Route>
            <Route path="/voucher/create" element={<Voucher></Voucher>}></Route>
            <Route path="/order" element={<Orders></Orders>}></Route>
            <Route
              path="/order/:orderId/info"
              element={<OrderInfomation></OrderInfomation>}
            ></Route>
          </Routes>
        </Grid>
      </Grid>
    </div>
  ) : (
    <div
      className="container"
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        marginTop: "10rem",
      }}
    >
      <AuthLogin></AuthLogin>
    </div>
  );
};

export default Admin;
