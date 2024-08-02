import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";

import Badge from "@mui/material/Badge";


import { Link } from "react-router-dom";

import Auth from "../../../customer/Auth.jsx";
import Navigation from "./Navigation.jsx";
import { useSelector } from "react-redux";

import { Container } from "@mui/material";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";


const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3px",
  backgroundColor: "white",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "300px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#545457",
  borderRadius: "3px",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#545457",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    width: "100%",
    paddingLeft: "10px",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Topbar = (props) => {

  const {cart} = useSelector(store => store)


  return (
    <div className="topbar">
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#F5F5F5",
            boxShadow: "none",
            borderRadius: "none",
          }}
        >
          <Container>
            <Toolbar sx={{ justifyContent: "end" }}>
              <Search>
                <SearchIconWrapper>
                  <SearchIcon />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <Box
                className="topbar-icons"
                // sx={{ display: { xs: "none", md: "flex" } }}
                sx={{display: 'flex'}}
              >
                <div className="topbar-icons-shoppingBag">
                  <Link to="/cart">
                    <StyledBadge badgeContent={cart.cart && cart.cart.totalItem || 0} color="secondary">
                      <ShoppingCartOutlinedIcon
                        sx={{ fontSize: "3rem", color: "black" }}
                      />
                    </StyledBadge>
                   
                  </Link>
 
                </div>

                {props.jwt ? <Navigation></Navigation> : <Auth></Auth>}
              </Box>
            </Toolbar>
          </Container>
        </AppBar>
      </Box>
    </div>
  );
};

export default Topbar;
