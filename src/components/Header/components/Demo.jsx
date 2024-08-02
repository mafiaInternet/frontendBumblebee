import * as React from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import MenuIcon from "@mui/icons-material/Menu";
import IconButton from "@mui/material/IconButton";
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
      text: "Chính sách đổi trả",
      href: "/policy",
    },
    {
      text: "TEELAB",
      href: "/home",
    },
    {
      text: "Bảng size",
      href: "/table-size",
    },
    {
      text: "Hệ thống cửa hàng",
      href: "/system-shop",
    },
  ];




  return (
    <Box class="abc" sx={{ display: { lg: "none" } }}>
      <React.Fragment>
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
            role="presentation"
            onClick={() => setState(false)}
            onKeyDown={() => setState(false)}
          >
            <List>
              {pages.map((page, index) => (
                <div>{page.text}</div>
              ))}
            </List>
          </Box>
        </Drawer>
      </React.Fragment>
    </Box>
  );
}
