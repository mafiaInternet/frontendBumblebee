import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  findProductsByCategory,
  sortProductsHigh,
  sortProductsLow,
  sortProductsNew,
  sortProductsOld,
} from "../../state/product/Action";
import {
  useParams,
} from "react-router-dom";
import {
  Box,
  Grid,
  MenuItem,
  Select,
} from "@mui/material";
import ProductCard from "./components/ProductCard";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

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
  const param = useParams();
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [sort, setAge] = useState("Mới nhất");

  const handleChange = (event) => {
    const sortType = event.target.value
    setAge(event.target.value);
    const data = Object.values(products.products)
    if(sortType == "Từ thấp đến cao"){
      dispatch(sortProductsLow(data))
    }else if(sortType === "Từ cao đến thấp"){
      console.log("abc")
      dispatch(sortProductsHigh(data))
    }else if(sortType === "Cũ nhất"){
      dispatch(sortProductsOld(data))
    }else if(sortType === "Mới nhất"){
      dispatch(sortProductsNew(data))
    }
  };

  useEffect(() => {
    dispatch(findProductsByCategory(param.name));
  }, [ param.name]);
 
  return (
    <div className="products ">
      <Box className="products__top">
        <h2 className="products__top__title" style={{fontSize: "24px"}}>
          {navItems.find((item) => item.link == param.name).name}
        </h2>
        <hr></hr>
        <div className="products__top__find">
          Sắp xếp theo: 
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={sort}
            style={{fontSize: "14px", fontWeight: "500", marginLeft: "10px"}}
            onChange={handleChange}
          >
            {sorts.map((item) => (
              <MenuItem value={item}>{item}</MenuItem>
            ))}
          </Select>
        </div>
      </Box>
      <div className="products-list">
        <Grid container spacing={2} className="row">
          {products.products ? (
            products.products.length > 0 ? (
              products.products.map((product, index) => (
                <Grid item xs={6} sm={4} md={3} key={index}>
                  <ProductCard product={product} />
                </Grid>
              ))
            ) : (
              <Grid item xs={12}>
                <div style={{fontSize: "20px", color: "silver", textAlign: "center", marginBottom: "100px" }}>
                <RemoveShoppingCartIcon style={{fontSize: "25px", marginBottom: "8px"}} /> 
                  Hết sản phẩm
                </div>
              </Grid>
            )
          ) : (
            <Grid item xs={12}>
              <div style={{fontSize: "20px", color: "silver", textAlign: "center", marginBottom: "100px" }}>Loading...</div>
            </Grid>
          )}
        </Grid>
      </div>
    </div>
  );
};

export default Product;
