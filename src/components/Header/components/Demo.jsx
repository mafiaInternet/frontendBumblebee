import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";
import { ListItem } from "@mui/material";
export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

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
  const pages = [
    {
      text: "Trang chủ",
      href: "/home",
    },
    {
      text: "Tất cả sản phẩm",
      href: "/product/all",
    },
    {
      text: "Bảng size",
      href: "/table-size",
    },
    {
      text: "Chính sách đổi trả",
      href: "/policy",
    },
    {
      text: "Hệ thống cửa hàng",
      href: "/system-shop",
    },
  ];

  const categories = [
    {
      text: "Áo thun",
      href: "ao-thun",
    },
    {
      text: "Baby Tee",
      href: "baby-tee",
    },
    {
      text: "Áo polo",
      href: "ao-polo",
    },
    {
      text: "Áo sơ mi",
      href: "ao-so-mi",
    },
    {
      text: "Áo khoác",
      href: "ao-khoac",
    },
    {
      text: "Hoodie",
      href: "hoodie",
    },
    {
      text: "Quần",
      href: "quan",
    },
    {
      text: "Phụ kiện",
      href: "phu-kien",
    },
  ];

  return (
    <Box sx={{ display: { lg: "none" } }}>
   
        <IconButton
          size="large"
          edge="start"
          color="dark"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={() => setState(true)}
        >
          <MenuIcon />
        </IconButton>

        <Drawer open={state} onClose={() => setState(false)}>
          <Box
          class="bar"
            role="presentation"
            onClick={() => setState(false)}
            onKeyDown={() => setState(false)}
          >
            <dl>
              <b>MENU</b>
              {pages.map((page, index) => (
                index != 1 ? (
                  <dt key={index}>
                    <Link>{page.text}</Link>
                  </dt>
                ) : (
                  categories.map((item, a) => (
                    <dd key={a}>
                     <Link to={item.href}>{item.text}</Link>
                    </dd>
                  ))
                )
              ))}
            </dl>
          </Box>
          
        </Drawer>
    
    </Box>
  );
}
