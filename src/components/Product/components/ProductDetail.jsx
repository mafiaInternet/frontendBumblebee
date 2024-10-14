import { Grid, Box, Typography, Button, ButtonGroup, TextField, Rating, Modal } from "@mui/material";
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
import AuthLogin from "../../../customer/auth/AuthLogin";
import AuthRegister from "../../../customer/auth/AuthRegister";
import { useLocation } from "react-router-dom";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const ProductDetail = () => {
  const dispatch = useDispatch();
  const { products, review, auth } = useSelector((store) => store);
  const location = useLocation();
  const param = useParams();
  const [product, setProduct] = useState(null);
  const [selectedColor, setSelectedColor] = useState();
  const [quantity, setQuantity] = useState(1);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [open, setOpen] = React.useState(false);
  const handleOpenAuth = () => setOpen(true);
  const handleCloseAuthClose = () => setOpen(false);
  const jwt = localStorage.getItem('jwt');

  const handleAddItem = () => {
    if (selectedColor == null || selectedSize == null) {
      alert("Vui lòng chọn màu áo và kích thước bạn muốn!!!");
    } else {
      const data = {
          productId: products.product.id,
          color: selectedColor.name,
          imageUrl: selectedColor.imageUrl,
          size: selectedSize.name,
          quantity: quantity,
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

 useEffect(() => {
  if(products.product && products.product){
    setTotalQuantity(products.product.totalQuantity)
   
    setSelectedColor(products.product.colors[0])
  }
 }, [products.product])

  const reviews = review.reviews.slice(1, 6);
  const totalStars = reviews.reduce(
    (acc, item) => acc + item.quantity * parseInt(item.star),
    0
  );
  const totalReviews = reviews.reduce((acc, item) => acc + item.quantity, 0);
  const averageStars = totalReviews === 0 ? 0 : totalStars / totalReviews;



  return (
    products.product &&
    products.product.id != null && (
      <div className="productDetail">
        <Box class="productDetail__item" style={{ marginTop: "16px" }}>
          <Grid container spacing={2}>
            <Grid item xs={12} md={7}  lg={6}>
              <Carousel
                showArrows={false}
                showStatus={false}
                swipeable={true}
                emulateTouch={true}
                infiniteLoop={true}
                showThumbs={window.innerWidth < 900 ? false : true}
                axis={"horizontal"}
              >
                {products.product.listImageUrl &&
                  products.product.listImageUrl.map((image) => (
                    <div>
                      <img
                        loading="lazy"
                        className="img-fluid"
                        src={image}
                        style={{ maxHeight: "681.625px" }}
                      ></img>
                    </div>
                  ))}
              </Carousel>
            </Grid>
            <Grid item xs={12} md={5} lg={6}>
              <Box class="productDetail__intro">
                <Typography class="productDetail__intro__title" component="h3">
                  {products.product.title}
                </Typography>
                <hr></hr>
                <Box sx={{display: "flex"}}>
                  <div className="productDetail__intro__stars d-flex align-items-center">
                    <span  style={{borderBottom: "1px solid #faaf00", color: "#faaf00", fontSize: "1.8rem", marginRight: "0.5rem" }}>{averageStars == 0 ? 5 : 5/averageStars}</span>
                    <Rating
                      sx={{
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                      name="half-rating-read "
                      value={averageStars == 0 ? 5 : 5/averageStars}
                      precision={0.1}
                      readOnly
                    />
                  </div>
                  <Box sx={{borderLeft: "1px solid", borderRight: "1px solid", margin: "0 1rem", padding: "0 1rem", display: "flex", alignItems: "center"}}>
                    <span style={{borderBottom: "1px solid black",fontSize: "1.8rem", color: "black", marginRight: "0.5rem" }}>{totalReviews != 0 ? totalReviews : ""}</span>
                    <span style={{fontSize: "1.8rem"}}>
                    {totalReviews != 0 ? "Đánh giá" : "Chưa có đánh giá"}

                    </span>
                  </Box>
                  <div>
                    <span style={{fontSize: "1.8rem"}}>{products.product.totalSold < 1000 ? products.product.totalSold +" Đã bán" : products.product.totalSold +"k Đã bán"}</span>
                  
                  </div>
                </Box>

                <Typography class="productDetail__intro__price">
                  <span>
                    <Price price={products.product.discountedPrice}></Price>
                  </span>
                  <span>
                    <Price price={products.product.price}></Price>
                  </span>
                  <span>- {products.product.discountPersent}%</span>
                </Typography>
                <div className="productDetail__intro__policy">
                  <p>
                    <img
                      loading="lazy"
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_1.png?1702398129862"
                    ></img>
                    <span>Đổi trả dễ dàng</span>
                  </p>
                  <p>
                    <img
                      loading="lazy"
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_1.png?1702398129862"
                    ></img>
                    <span>Chính hãng 100%</span>
                  </p>
                  <p>
                    <img
                      loading="lazy"
                      className="img-fluid"
                      src="https://bizweb.dktcdn.net/100/415/697/themes/902041/assets/product_poli_3.png?1702398129862"
                    ></img>
                    <span>Giao toàn quốc</span>
                  </p>
                </div>
                <dl className="productDetail__intro__info">
                  <dt style={{ fontSize: "20px" }}>Thông tin sản phẩm</dt>
                  <dd>Chất liệu: Cotton</dd>
                  <dd>Kích thước: Oversize</dd>
                  <dd>Thiết kế: In lua</dd>
                </dl>
                <Box class="product__option">
                  <dt style={{ fontSize: "20px" }}> Màu sắc </dt>
                  <Box sx={{display: "flex", flexWrap: "wrap"}} container spacing={1}>
                    {products.product &&
                      products.product.colors.map((color) => (
                          <Button
                          key={color.id}
                            className="product__option__item__colors "
                            onClick={() => handleClick(color)}
                          >
                            <img
                              loading="lazy"
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
           
                      ))}
                      
                  </Box>
                </Box>
                <Box class="product__size">
                      {selectedColor && (
                  <dt style={{ fontSize: "20px" }}> Kích thước </dt>

                      )}
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
                  <dt style={{ fontSize: "20px" }}>Số lượng</dt>
                  <div className="d-flex" style={{ gap: "10px" }}>
                    <Button
                      className="product__quantity__toggle"
                      onClick={() => setQuantity(quantity - 1)}
                    >
                      -
                    </Button>
                    <TextField
                      variant="outlined"
                      InputProps={{
                        style: { fontSize: 14 },
                      }}
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
                  <Link to="/table-size">+ Hướng dẫn chọn size</Link>
                </Box>
                <ButtonGroup class="button-group-end">
                  <Button
                    class="btn btn-outline-dark"
                    onClick={jwt ? handleAddItem : handleOpenAuth}
                  >
                    Thêm vào giỏ hàng
                  </Button>
                  <Link to={jwt ? "/payment" : null}>
                    <Button class="btn btn-dark " onClick={jwt ? createCheckOut : handleOpenAuth}>
                      Mua ngay
                    </Button>
                  </Link>
                </ButtonGroup>
              </Box>
            </Grid>
          </Grid>
        </Box>
        <ProductText />
        <Review product={products.product}/>
        <Modal
          open={jwt ? false : open}
          onClose={handleCloseAuthClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style} style={{ borderRadius: "20px" }}>
            {location.pathname !== "/register" ? (
              <AuthLogin/>
            ) : (
              <AuthRegister/>
            )}
          </Box>
        </Modal>
      </div>
    )
  );
};

export default ProductDetail;
