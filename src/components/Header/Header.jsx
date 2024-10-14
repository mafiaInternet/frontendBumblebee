import React from "react";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Topbar from "./components/Topbar";
import Bar from "./components/Bar";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../state/auth/Action";
import { getCarts } from "../../state/cart/Action";


const Header = () => {
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  React.useEffect(() => {
    if (auth.jwt && jwt) {
      console.log('abc')
      dispatch(User(jwt));
      dispatch(getCarts());
    }
  }, [dispatch, jwt, auth.jwt]);
  return (
    <Box
      className="header"
      sx={{ position: "sticky", top: "0px", width: "100%", zIndex: "9" }}
    >
      <Box sx={{ display: { xs: "none", lg: "block" } }}>
        <Topbar
          jwt={jwt}
          cartItems={cart.cart && cart.cart.cartItems ? cart.cart.cartItems : []}
        ></Topbar>
        <Nav auth={auth}></Nav>
        <Menu></Menu>
      </Box>
      <Bar
        jwt={jwt}
        cartItems={
          cart.cart && cart.cart.cartItems ? cart.cart.cartItems : []
        }
      ></Bar>
    </Box>
  );
};

export default Header;
