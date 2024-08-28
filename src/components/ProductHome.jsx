import { Typography, Box, Grid } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts } from "../state/product/Action";
import { Link } from "react-router-dom";
import ProductCard from "./Product/components/ProductCard";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import DescriptionIcon from '@mui/icons-material/Description';


const StyledBox = {
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  padding: '20px',
  marginTop: '20px',
  width: '100%',
};

const EmptyStateBox = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  ...StyledBox,
};

const LoadingText = {
  textAlign: 'center',
  color: 'silver',
  fontSize: '20px',
  marginTop: '40px',
  width: '100%',
};

const ProductSlideLink = {
  textAlign: 'center',
  color: '#1976d2',
  fontWeight: 'bold',
  textDecoration: 'none',
  marginTop: '20px',
  display: 'block',
};

const ProductHome = () => {
  const dispatch = useDispatch();
  const text ="Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.";
  const { products } = useSelector((store) => store);
  const navItems = [
    { link: "ao-thun", name: "Áo thun" },
    { link: "baby-tee", name: "Baby Tee" },
    { link: "ao-polo", name: "Áo Polo" },
    { link: "ao-so-mi", name: "Áo sơ mi" },
    { link: "ao-khoac", name: "Áo khoác" },
    { link: "quan", name: "Quần" },
    { link: "quan-nu", name: "Quần nữ" },
    { link: "phu-kien", name: "Phụ kiện" },
  ];

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);


  return (
    <Box className="productHome">
      <Box
        sx={{
          width: { xs: "80%", md: "70%", lg: "50%" },

          margin: "50px auto",

          textAlign: "center",
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "3rem", md: "3.5rem" }, fontWeight: "400" }}
        >
          Enjoy Your Youth
        </Typography>
        <Typography
          component="p"
          sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
        >
          {text}
        </Typography>
      </Box>
      <Box className="product-slide" sx={{ width: { xs: '70%', md: '90%', lg: '80%' }, mx: 'auto' }}>
        {navItems?.map((navItem, index) => (
          <Box key={index} mb={4}>
            <Typography style={{fontSize: "32px"}} gutterBottom>
              {navItem.name}
            </Typography>
            <Box sx={StyledBox}>
              <Grid container spacing={2}>
                {products.products && products.products.length > 0 ? (
                  products.products.filter(
                    product =>
                      product &&
                      product.category &&
                      product.category.nameId === navItem.link
                  ).length > 0 ? (
                    products.products.map((product, index) => (
                      product &&
                      product.category &&
                      product.category.nameId === navItem.link && (
                        <Grid item xs={6} sm={4} md={3} key={index}>
                          <ProductCard product={product} />
                        </Grid>
                      )
                    ))
                  ) : (
                    <Box sx={EmptyStateBox}>
                      <Typography style={{ fontSize: '18px' }} color="textSecondary">
                        <DescriptionIcon style={{ fontSize: '24px', marginBottom: '5px' }} /> Đã hết hàng
                      </Typography>
                    </Box>
                  )
                ) : (
                  <Typography sx={LoadingText}>Loading...</Typography>
                )}
              </Grid>
            </Box>
            {products?.products.length > 8 && (
              <Link to={`/product/${navItem.link}`} style={ProductSlideLink}>
                Xem thêm
              </Link>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProductHome;
