import React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";

import { Link } from "react-router-dom";
import "../style.css";

const Nav = ({ auth }) => {
  const pages = [
    {
      text: "",
      href: "/home",
    },
    {
      text: "Chính sách đổi trả",
      href: "/policy",
    },
    {
      text: "Bảng kích thước",
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
          backgroundColor: "#F5F5F5",
          boxShadow: "none",
          borderRadius: "none",
        }}
      >
        <Toolbar className="d-flex justify-content-center">
          <Box className="navbar">
            {pages.map((page, index) => (
              <Link to={page.href} key={index}>
                {page.text}
              </Link>
            ))}
          </Box>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Nav;
