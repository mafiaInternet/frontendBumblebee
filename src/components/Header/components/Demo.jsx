import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
import { Link } from "react-router-dom";

export default function TemporaryDrawer() {
  const [state, setState] = React.useState(false);

  const pages = [
    {
      text: "Trang chủ",
      href: "/home",
    },
    {
      text: "Tất cả sản phẩm",
      href: "#",
    },
    {},
    {
      text: "Bảng kích thước",
      href: "/table-size",
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
    },
  ];

  const categories = [
    {
      text: "Áo thun",
      href: "/product/ao-thun",
    },
    {
      text: "Baby Tee",
      href: "/product/baby-tee",
    },
    {
      text: "Áo polo",
      href: "/product/ao-polo",
    },
    {
      text: "Áo sơ mi",
      href: "/product/ao-so-mi",
    },
    {
      text: "Áo khoác",
      href: "/product/ao-khoac",
    },
    {
      text: "Hoodie",
      href: "/product/hoodie",
    },
    {
      text: "Quần",
      href: "/product/quan",
    },
    {
      text: "Phụ kiện",
      href: "/product/phu-kien",
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
          className="bar"
          role="presentation"
          onClick={() => setState(false)}
          onKeyDown={() => setState(false)}
        >
          <dl>
            <b style={{ display: "inline-block", width: "100%", textAlign: "center", fontSize: "30px"}}>MENU</b>
            {pages.map((page, index) =>
              index !== 2 ? (
                <dt key={index}>
                  <Link to={page.href}>{page.text}</Link>
                </dt>
              ) : (
                categories.map((item, a) => (
                  <dd key={a}>
                    <Link to={item.href}>{item.text}</Link>
                  </dd>
                ))
              )
            )}
          </dl>
        </Box>
      </Drawer>
    </Box>
  );
}
