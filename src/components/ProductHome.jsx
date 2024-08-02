import { Typography, Box, Grid, Button } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getProducts, getProductsByCategoryNew } from "../state/product/Action";

import { Link } from "react-router-dom";
import ProductCard from "./Product/components/ProductCard";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import axios from "axios";

const ProductHome = () => {
  const preset_key = "ml_default"
  const cloud_name = "dq22msbw0"
  const [image, setImage] = useState()

  const handleFile = (event) => {
    const file = event.target.files[0]
    console.log(file)
    // const formData = new FormData()
    // formData.append('file', file)
    // formData.append('upload_preset', preset_key)
    // axios.post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, formData)
    // .then(res => console.log(res.data.secure_url))
    // .catch(err => console.log(err))
  }
  const dispatch = useDispatch();
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
  console.log(
    products.products && products.products && products.products[0]
      ? products.products[0].category
      : "loading"
  );
  // console.log(products.products.filter((product) => product.price === 1000));
  const text =
    "Không chỉ là thời trang, TEELAB còn là “phòng thí nghiệm” của tuổi trẻ - nơi nghiên cứu và cho ra đời nguồn năng lượng mang tên “Youth”. Chúng mình luôn muốn tạo nên những trải nghiệm vui vẻ, năng động và trẻ trung.";
  const settings = {
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
  };
  return (
    <Box className="productHome">
      <Box
        sx={{
          width: { xs: "80%", md: "70%", lg: "50%" },
          margin: "100px auto",
          textAlign: "center",
        }}
      >
        <Typography
          component="h2"
          sx={{ fontSize: { xs: "3rem", md: "3.5rem" }, fontWeight: "400" }}
        >
          Enjoy Your Youth
          <Box>
            <input type="file" multiple onChange={handleFile}></input>
            <img src={image}></img>

          </Box>
        </Typography>
        <Typography
          component="p"
          sx={{ fontSize: { xs: "1.5rem", md: "1.8rem" } }}
        >
          {text}
        </Typography>
      </Box>

      <Box
        className="product-slide"
        sx={{ width: { xs: "70%", md: "90%", lg: "80%" } }}
      >
        {navItems &&
          navItems.map((navItem, index) => (
            <div key={index}>
              <h3 className="product-slide-title">{navItem.name}</h3>
              <Grid container spacing={2}>
                {products.products && products.products ? (
                  products.products.map((product, index) => (
                    product && product.category && product.category.nameId === navItem.link ? 
                    <Grid item xs={6} sm={4} md={3} key={index}>
                      <ProductCard product={product}></ProductCard>
                    </Grid>
                    : <div>Loading</div>
                  ))
                ) : (
                  <div>Loading...</div>
                )}

                <Link
                  to={`/product/${navItem.link}`}
                  className="product-slide-link col-3"
                >
                  Xem thêm
                </Link>
              </Grid>
            </div>
          ))}
      </Box>
    </Box>
  );
};

export default ProductHome;
