import { Grid, Box, Typography, Button, ButtonGroup, TextField, Rating } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { findProductsById } from "../../../state/product/Action";
import { addItemToCart, createCartItem } from "../../../state/cart/Action";
import ProductText from "./ProductText";
import { getReviewByProduct } from "../../../state/review/Action";
import Review from "../../review/Review";
import { Price } from "../../../config/config";


const ProductDetail = () => {
  const dispatch = useDispatch();
  const { products, review, auth } = useSelector((store) => store);
  const param = useParams();
  const [rate, setRate] = useState();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [color, setColor] = useState(
    products.product && products.product.colors && products.product.colors[0]
  );
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(
    products.product &&
      products.product.colors &&
      products.product.totalQuantity
  );
  const [data, setData] = useState({
    productId: param.name,
    color: null,
    imageUrl: null,
    size: null,
    quantity: 1,
  });

  const handleAddItem = () => {
    if (selectedColor == null || selectedSize == null) {
      alert("vale");
    } else {
      const data = {
        user: auth.user,
        cart:localStorage.getItem("cart") != null ? JSON.parse(localStorage.getItem("cart")) : localStorage.getItem("cart"),
        req: {
          productId: products.product.id,
          color: selectedColor.name,
          imageUrl: selectedColor.imageUrl,
          size: selectedSize.name,
          quantity: quantity,
        }
      }
      dispatch(addItemToCart(data));
    }
  };

  const createCheckOut = (e) => {
    if (selectedColor == null || selectedSize == null) {
      alert("value");
      e.preventDefault();
    } else {
      const data = {
        productId: products.product.id,
        color: selectedColor.name,
        imageUrl: selectedColor.imageUrl,
        size: selectedSize.name,
        quantity: quantity,
      };
      dispatch(createCartItem({ addItemRequest: data }));
    }
  };

  const handleClick = (item) => {
    setSelectedColor(item);
    setSelectedSize(null);
  };

  const [selectedSize, setSelectedSize] = useState();
  const handleClickSize = (item) => {
    setSelectedSize(item);
  };

  useEffect(() => {
    if (!products.product || products.product.id != param.name) {
      dispatch(findProductsById(param.name));
      dispatch(getReviewByProduct(param.name));
    } else {
      setProduct(products.product);
    }
  }, [dispatch]);

  useEffect(() => {
    dispatch(getReviewByProduct(param.name));
  }, [review.star]);

  return (
    products.product &&
    products.product.id != null && (
      <div className="productDetail">
        <Box class="productDetail__item">
          <Grid container spacing={2}>
            <Grid item xs={7}>
              <Carousel
                showArrows={false}
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
                infiniteLoop={true}
                axis={"horizontal"}
              >
                {products.product.listImageUrl &&
                  products.product.listImageUrl.map((image) => (
                    <div>
                      <img className="img-fluid" src={image}></img>
                    </div>
                  ))}
              </Carousel>
            </Grid>
            <Grid item xs={5}>
              <Box class="productDetail__intro">
                <Typography class="productDetail__intro__title" component="h3">
                  {products.product.title}
                </Typography>
                <hr></hr>
                <div className="productDetail__intro__stars d-flex">
                  <Rating
                    sx={{ alignItems: "center", justifyContent: "center" }}
                    name="half-rating-read "
                    value={rate}
                    precision={0.1}
                    readOnly
                  />
                </div>
                <Typography class="productDetail__intro__price">
                <span><Price price={products.product.discountedPrice}></Price></span>
                <span><Price price={products.product.price}></Price></span>
                <span>- {products.product.discountPersent}%</span>
                </Typography>
                <div className="productDetail__intro__policy">
                  <p>
                    <img
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_1.png?1702398129862"
                    ></img>
                    <span>Đổi trả dễ dàng</span>
                  </p>
                  <p>
                    <img
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_1.png?1702398129862"
                    ></img>
                    <span>Chính hãng 100&</span>
                  </p>
                  <p>
                    <img
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_3.png?1702398129862"
                    ></img>
                    <span>Giao toàn quốc</span>
                  </p>
                </div>
                <dl className="productDetail__intro__info">
                  <dt>Thông tin sản phẩm</dt>
                  <dd>- Chất liệu: Cotton</dd>
                  <dd>- Form: Oversize</dd>
                  <dd>- Color: Black</dd>
                  <dd>- Design: In lua</dd>
                </dl>
                <Box class="product__option">
                  <Typography>
                    Màu sắc: {selectedColor != null ? selectedColor.name : ""}
                  </Typography>
                  <Grid container spacing={1}>
                    {products.product &&
                      products.product.colors.map((color, index) => (
                        <Grid item xs={2}>
                          <Button
                            className="product__option__item__colors "
                            variant="text"
                            onClick={() => handleClick(color)}
                          >
                            <img
                              className={`img-fluid ${
                                selectedColor != null &&
                                selectedColor.id === color.id
                                  ? "active"
                                  : ""
                              }`}
                              id={color.name}
                              src={color.imageUrl}
                              onClick={() => handleClick(color)}
                            ></img>
                          </Button>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                <Box class="product__size">
                  <h5>Kích thước: {data.size}</h5>
                  <Grid container spacing={1}>
                    {selectedColor &&
                      selectedColor.sizes.map((size) => (
                        <Grid item xs={1} onClick={() => handleClickSize(size)}>
                          <p
                            className={`${
                              selectedSize && selectedSize.id === size.id
                                ? "active"
                                : ""
                            }`}
                            onClick={() => handleClickSize(size)}
                          >
                            {size.name}
                          </p>
                        </Grid>
                      ))}
                  </Grid>
                </Box>
                <Box class="product__quantity">
                  <Typography>Số lượng</Typography>
                  <div>
                    <Button
                      className="product__quantity__toggle"
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <TextField
                      variant="outlined"
                      value={quantity}
                      onChange={(e) => setQuantity(Number(e.target.value))}
                    ></TextField>
                    <Button
                      className="product__quantity__toggle"
                      onClick={() => setQuantity(quantity + 1)}
                    >
                      +
                    </Button>
                  </div>
                  <p>
                    {selectedSize != null
                      ? selectedSize.quantity
                      : totalQuantity}{" "}
                    sản phẩm có sẵn
                  </p>
                </Box>
                <Box class="link-table-size">
                  <Link to="/table-size">+Hướng dẫn chọn size</Link>
                </Box>
                <ButtonGroup class="button-group-end">
                  <Button
                    class="btn btn-outline-dark"
                    onClick={() => handleAddItem()}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Link to="/payment">
                    <Button class="btn btn-dark " onClick={createCheckOut}>
                      Mua ngay
                    </Button>
                  </Link>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <ProductText></ProductText>
        <Review product={products.product} setRate={setRate}></Review>
      </div>
    )
  );
};

export default ProductDetail;
