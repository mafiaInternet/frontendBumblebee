import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductFilter,
  findProductsByCategory,
  sortProductsHigh,
  sortProductsLow,
  sortProductsNew,
  sortProductsOld,
} from "../../state/product/Action";
import { useLocation, useParams } from "react-router-dom";
import { Box, Grid, MenuItem, Select, Typography } from "@mui/material";
import ProductCard from "./components/ProductCard";
import RemoveShoppingCartIcon from "@mui/icons-material/RemoveShoppingCart";

const styledBox = {
  backgroundColor: "#f9f9f9",
  borderRadius: "8px",
  padding: "20px",
  width: "100%",
};

const StyledMessageBox = {
  color: "rgba(0, 0, 0, 0.6)",
  textAlign: "center",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexDirection: "column",
  height: "100px",
  ...styledBox,
};

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

const sorts = ["Từ thấp đến cao", "Từ cao đến thấp", "Cũ nhất", "Mới nhất"];

const Product = () => {
  const location = useLocation()
  const query = new URLSearchParams(location.search)
 
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [sort, setAge] = useState("Mới nhất");

  const handleChange = (event) => {
    const sortType = event.target.value;
    setAge(event.target.value);
    const data = Object.values(products.products);

    if (sortType == "Từ thấp đến cao") {
      dispatch(sortProductsHigh(data));
    } else if (sortType === "Từ cao đến thấp") {
      dispatch(sortProductsLow(data));
    } else if (sortType === "Cũ nhất") {
      dispatch(sortProductsOld(data));
    } else if (sortType === "Mới nhất") {
      dispatch(sortProductsNew(data));
    }
  };

  useEffect(() => {
    if(!query.get("title")){

      dispatch(findProductsByCategory(query.get("category")));
    }else{

      dispatch(findProductFilter({category: query.get("category"), title: query.get("title")}))
    }
  }, [query.get("category"), query.get("title")]);

  return (
    <div className="products ">
      <Box className="products__top">
        <h2 className="products__top__title" style={{ fontSize: "24px" }}>
          {navItems.find((item) => item.link == query.get("category")).name}
        </h2>
        <hr></hr>
        <div className="products__top__find">
          Sắp xếp theo:
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            style={{ fontSize: "14px", fontWeight: "500", marginLeft: "10px" }}
            onChange={handleChange}
          >
            {sorts.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </div>
      </Box>
      <Box sx={styledBox}>
        <Grid container spacing={2}>
          {products.products ? (
            products.products.length > 0 ? (
              products.products.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <Box sx={StyledMessageBox}>
                  <RemoveShoppingCartIcon
                    style={{ fontSize: "28px", marginBottom: "8px" }}
                  />
                  <Typography style={{ fontSize: "24px" }}>
                    Đã hết hàng
                  </Typography>
                </Box>
              </Grid>
            )
          ) : (
            <Grid item xs={12}>
              <Box sx={StyledMessageBox}>
                <Typography style={{ fontSize: "24px" }}>Loading...</Typography>
              </Box>
            </Grid>
          )}
        </Grid>
      </Box>
    </div>
  );
};

export default Product;
