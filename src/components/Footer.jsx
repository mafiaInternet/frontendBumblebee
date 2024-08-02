import * as React from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { List, ListItem, Typography } from "@mui/material";
import { FaLocationDot, FaLocationArrow } from "react-icons/fa6";
import { Link } from "react-router-dom";

const Footer = () => {
  const addresses = [
    "CS1 - Thái Nguyên: 235 Quang Trung, TP Thái Nguyên",
    "CS2 - Thái Nguyên: 599 Lương Ngọc Quyến, TP Thái Nguyên",
    "CS3 - Thái Bình: 161 Hai Bà Trưng, TP Thái Bình",
    "CS4 - Vĩnh Phúc: 06 Mê Linh, TP Vĩnh Yên",
    " CS5 - Hải Dương: 09 Nguyễn Thị Duệ, TP Chí Linh",
  ];

  const contacts = [
    {
      image: "/img/icon-face-trang-suc-inox-csj.png",
      href: "https://www.facebook.com/teelab.vn",
    },
    {
      image: "/img/instagram.png",
      href: "https://www.instagram.com/teelab.vn/",
    },
    {
      image: "/img/tiktok.svg",
      href: "https://www.tiktok.com/@teelab.studio",
    },
    {
      image: "/img/shoppe.jpg",
      href: "https://shopee.vn/teelab_official",
    },
    {
      image: "/img/lazada.png",
      href: "https://www.lazada.vn/shop/teelab/?path=promotion-40936-0.htm&tab=promotion",
    },
  ];
  const navs = [
    "Trang chủ",
    "Tất cả sản phẩm",
    "Chính sách đổi trả",
    "Bảng size",
    "Kiểm tra đơn hàng",
    "Hệ thống cửa hàng",
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
      text: "Bảng size",
      href: "/table-size",
    },
    {
      text: "Hệ thống cửa hàng",
      href: "/system-shop",
    },
  ];

  return (
    <div className="footer">
      <Box sx={{ flexGrow: 1, width: {xs: "90%", lg: "80%"}, margin: "3rem auto" }}>
        <Grid container spacing={3} sx={{justifyContent: "space-around"}}>
        <Grid
            className="footer__contact"
            item
            xs={12}

            sx={{ textAlign: "center" }}
          >
            <Typography component="h5">Đăng ký</Typography>
            <Box
              className="footer__contact__input"
              sx={{
                position: "relative",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                border: "1px solid silver",
                height: "20px",
                width: {xs: "80%", md: "60%"},
                fontSize: "1.5rem",
                margin: "0 auto"
              }}
            >
              <input
                type="text"
                style={{
                  position: "absolute",
                  top: "0",
                  left: "0",
                  padding: "1rem",
                  width: "100%",
                  height: "100%",
                  border: "none",
                  outline: "none"
                }}
                placeholder="Nhập địa chỉ email"
              ></input>
              <FaLocationArrow
                style={{
                  position: "absolute",
                  right: "10px",
                  textAlign: "right",
                }}
              ></FaLocationArrow>
            </Box>
            <p>Theo dõi Teelab từ các nền tảng khác nhau nhé!</p>
            <Grid container spacing={2} sx={{ width: "30%", margin: "0 auto" }}>
              {contacts.map((contact, index) => (
                <Grid item xs={2} key={index}>
                  <a href={contact.href}>
                    <img className="img-fluid" src={contact.image}></img>
                  </a>
                </Grid>
              ))}
            </Grid>
          </Grid> 
          <Grid item xs={6} md={4}>
            <h5>TEELAB</h5>
            <Typography component={'p'} marginTop={'2rem'}>
              <strong>HKD Vũ Thị Quỳnh Anh</strong>
              <br></br>
              Giấy chứng nhận đăng ký HKD số 17A80041952 do Phòng Tài chính - Kế
              hoạch, Uỷ ban nhân dân thành phố Thái Nguyên cấp ngày 30/5/2019
              <br></br>
              Địa chỉ: Số 235, Đường Quang Trung, Tổ 7, Phường Tân Thịnh, Thành
              phố Thái Nguyên, Tỉnh Thái Nguyên, Việt Nam
              <br></br>
              Email: teelabvn@gmail.com Điện thoại: 0865539083
      
            </Typography>
            <Box width={"50%"}>
              <img className="img-fluid" src="/img/logo_bct.png"></img>
            </Box>
          </Grid>
        
          <Grid item xs={6} md={3} >
            <h5 >ABOUT US</h5>
            <List>
              {pages.map((page) => (
                <ListItem>

                <Link to={page.href}>{page.text}</Link>
                </ListItem>
    
              ))}
            </List>
          </Grid>
          <Grid className="footer__address" item xs={12} md={5}>
            <Typography component="h5">ĐỊA CHỈ</Typography>
            <List>
              {addresses.map((address, index) => (
                <ListItem sx={{ fontSize: "1.5rem" }} key={index}>
                  <FaLocationDot color="red" size={20} /> {address}
                </ListItem>
              ))}
            </List>
          </Grid>
        </Grid>
      </Box>
    </div>
  );
};
export default Footer;
