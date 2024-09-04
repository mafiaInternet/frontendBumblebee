import { AppBar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import React from "react";

const navItems = [
  { link: "all", name: "Tất cả sản phẩm" },
  { link: "ao-thun", name: "Áo Thun" },
  { link: "baby-tee", name: "Baby Tee" },
  { link: "ao-polo", name: "Áo Polo" },
  { link: "ao-so-mi", name: "Áo sơ mi" },
  { link: "ao-khoac", name: "Áo khoác" },
  { link: "quan", name: "Quần" },
  { link: "quan-nu", name: "Quần nữ" },
  { link: "phu-kien", name: "Phụ kiện" },
];

const Menu = () => {
  return (
    <Box className="menu" sx={{ display: { md: "none", lg: "flex" } }}>
      <AppBar
        component="nav"
        position="static"
        sx={{
          backgroundColor: "#F5F5F5",

          color: "#555555",
          boxShadow: "none",
          borderRadius: "none",
        }}
      >
        <Box sx={{ sm: "block", textAlign: "center", paddingY: "10px" }}>
          {navItems.map((navItem) => (
            <Link
              to={`/product/${navItem.link}`}
              key={navItem}
              style={{
                fontSize: "16px",
                marginRight: "30px",
                cursor: "pointer",
              }}
            >
              {navItem.name}
            </Link>
          ))}
        </Box>
      </AppBar>
    </Box>
  );
};

export default Menu;
