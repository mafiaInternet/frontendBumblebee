import React from "react";
import Nav from "./components/Nav";
import Menu from "./components/Menu";
import Topbar from "./components/Topbar";
import PrimarySearchAppBar from "./components/AppBar";

import { Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { User } from "../../state/auth/Action";
import { getCarts } from "../../state/cart/Action";


const Header = () => {
  const dispatch = useDispatch();
  const { auth, cart } = useSelector((store) => store);
  const jwt = localStorage.getItem("jwt");
  console.log(cart);
  React.useEffect(() => {
    if (jwt) {
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
          cartItems={cart.cart && cart.cart.cartItems ? cart.cart.cartItem : []}
        ></Topbar>
        <Nav auth={auth}></Nav>
        <Menu></Menu>
      </Box>
      <PrimarySearchAppBar
        jwt={jwt}
        cartItems={
          cart.cart && cart.cart.cartItems != null ? cart.cart.cartItems : []
        }
      ></PrimarySearchAppBar>
    </Box>
  );
};

export default Header;
