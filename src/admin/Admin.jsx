import * as React from "react";

import Box from "@mui/material/Box";
import ListProduct from "./components/product/ListProduct";
import { useDispatch, useSelector } from "react-redux";

import Customers from "./components/user/Customers";
import Orders from "./components/order/Orders";

import Demo from "./components/product/Demo";

import HomeIcon from "@mui/icons-material/Home";
import { Grid, Typography } from "@mui/material";

import { GetAdmin, Login } from "../state/auth/Action";
import { Link, useLocation } from "react-router-dom";

import PrimarySearchAppBar from "./components/Header";
import ChangeCustomer from "./components/user/components/ChangeCustomer";
import PersonIcon from "@mui/icons-material/Person";
import ConfirmationNumberIcon from "@mui/icons-material/ConfirmationNumber";
import CommentIcon from "@mui/icons-material/Comment";
import FullscreenExitIcon from "@mui/icons-material/FullscreenExit";
import BarChartIcon from "@mui/icons-material/BarChart";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import DehazeIcon from "@mui/icons-material/Dehaze";
import OrderInfomation from "./components/order/components/OrderInfomation";
import Home from "./components/home/Home";
import CryptoTracker from "./components/CryptoTracker";
import Voucher from "./components/voucher/Voucher";
import ListVoucher from "./components/voucher/ListVoucher";


const TabPanelProps = {
  children: null,
  index: null,
  value: null,
};

function TabPanel(props = TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3, height: "100%" }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    "aria-controls": `vertical-tabpanel-${index}`,
  };
}
const text = "/admin";
const tabs = [
  {
    link: "/admin",
    icon: <HomeIcon></HomeIcon>,
    name: "Trang chủ",
    page: <Home></Home>,
  },
  {
    link: text + "/user",
    icon: <PersonIcon></PersonIcon>,
    name: "Người dùng",
    page: <Customers></Customers>,
  },
  {
    link: text + "/product",
    icon: <FullscreenExitIcon></FullscreenExitIcon>,
    name: "Sản phẩm",
    page: <ListProduct></ListProduct>,
  },
  {
    link: text + "/voucher",
    icon: <ConfirmationNumberIcon></ConfirmationNumberIcon>,
    name: "Mã giảm giá",
    page: <ListVoucher></ListVoucher>,
  },
  {
    link: text + "/order",
    icon: <ShoppingCartIcon></ShoppingCartIcon>,
    name: "Đơn hàng",
    page: <Orders></Orders>,
  },
  {
    link: text + "/review",
    icon: <CommentIcon></CommentIcon>,
    name: "Phản hồi",
    page: "",
  },
  {
    link: text + "/chart",
    icon: <BarChartIcon></BarChartIcon>,
    name: "Thống kê",
    page: "",
  },
  {
    link: text + "/demo",
    icon: "",
    name: "demo",
    page: ""

  }
];

const Admin = () => {
  const dispatch = useDispatch();
  const { auth } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");

  const location = useLocation();

  React.useEffect(() => {
    if (jwt) {
      dispatch(GetAdmin(jwt));
    }
  }, [dispatch, jwt, auth.jwt]);

  return jwt ? (
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
          <ul>
            {tabs.map((item, index) => (
              <li>
                <Link to={item.link} key={index}>
                  {item.icon} {item.name}
                </Link>
              </li>
            ))}
          </ul>
        </Grid>
        <Grid item xs={10} className="admin--navTabs--page">
          <PrimarySearchAppBar></PrimarySearchAppBar>
          {tabs.map((item) =>
            location.pathname === item.link ? item.page : ""
          )}
          {location.pathname == "/admin/user/edit" && (
            <ChangeCustomer></ChangeCustomer>
          )}
          {location.pathname === "/admin/product/add" && <Demo></Demo>}
          {location.pathname === "/admin/order/info" && <OrderInfomation></OrderInfomation>}
          {/* <CryptoTracker></CryptoTracker> */}
        </Grid>
      </Grid>
    </div>
  ) : <Login></Login>
};

export default Admin;
