import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Container from "@mui/material/Container";

import { Link } from "react-router-dom";


const Nav = (props) => {
  const pages = [
    {
      text: "Trang chủ",
      href: "/home",
    },
    {
      text: "Chính sách đổi trả",
      href: "/policy",
    },
    {
      text: `${props.jwt && props.auth.user && props.auth.user.role == "ADMIN" ? "ADMIN" : "BUMBLEBEE"}`,
      href: `${props.jwt && props.auth.user && props.auth.user.role == "ADMIN" ? "/admin" : "/home"}`,
    },
    {
      text: "Bảng size",
      href: "/table-size",
    },
    {
      text: "Hệ thống cửa hàng",
      href: "/system-shop",
    }
  ];
  

  return (
    <Box className="nav">
      <AppBar
        position="static"
        sx={{
          backgroundColor: "white",
          color: "#555555",
          boxShadow: "none",
          borderRadius: "none",
          borderBottom: "1px solid silver",
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Box class="nav__list">
              {pages.map((page, index) => (
                <Link to={page.href} key={index}>
                  {page.text}
                </Link>
              ))}
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
    </Box>
  );
};

export default Nav;
