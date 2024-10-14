import { Box, TextField, ButtonGroup } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart, createCartItem } from "../../../state/cart/Action";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Carousel } from "react-responsive-carousel";
import { Price } from "../../../config/config";
import "../style.css";
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

const ProductCard = ({ product }) => {
  const { products, auth } = useSelector((store) => store);
  const location = useLocation();
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(product && product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product && product.colors[0].sizes[0].name
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const nevigate = useNavigate();

  const [totalQuantity, setTotalQuantity] = useState(
    products.product &&
      products.product.colors &&
      products.product.totalQuantity
  );
  const jwt = localStorage.getItem("jwt");

  const [isAuthenticated, setIsAuththenticated] = useState(false);

  const handleCloseAuthClose = () => setIsAuththenticated(false);
  const handleAddItem = (e) => {
    if (!jwt) {
      setIsAuththenticated(true);
    } else {
      if (selectedSize == null) {
        alert("value");
        e.preventDefault();
      } else {
        const data = {
          user: auth.user,
          cart:
            localStorage.getItem("cart") != null
              ? JSON.parse(localStorage.getItem("cart"))
              : [],
          req: {
            productId: product.id,
            color: selected.name,
            imageUrl: selected.imageUrl,
            size: selectedSize,
            quantity: quantity,
          },
        };
        setOpen(false);
        dispatch(addItemToCart(data));
      }
    }
  };

  const createCheckOut = (e) => {
    if (!jwt) {
      setIsAuththenticated(true);
    } else {
      if (selectedSize == null) {
        alert("value");
        e.preventDefault();
      } else {
        const data = {
          productId: product.id,
          color: selected.name,
          imageUrl: selected.imageUrl,
          size: selectedSize,
          quantity: quantity,
        };
        dispatch(createCartItem({ addItemRequest: data }));
        nevigate("/payment");
      }
    }
  };

  useEffect(() => {
    setIsAuththenticated(false);
  }, [jwt]);

  return (
    <div className="product--card hover-div" key={product.id}>
      <div className="product--card--image">
        <div className="product--card--image--wrapper">
          <Link to={`/product-detail/${product.id}`}>
            <img loading="lazy" src={selected.imageUrl} alt={product.title} />
          </Link>
          <span className="product--card--image--wrapper--persent">
            -{product.discountPersent}%
          </span>
          <div className="product--card--image--wrapper--cart">
            <Button onClick={handleOpen}>Mua hàng</Button>
          </div>
        </div>
      </div>
      <div>
        <div className="product--card--colors">
          <Box sx={{ display: "flex" }}>
            {product &&
              product.colors.map((item, index) => (
                <div
                  className="product--card--colors--item"
                  onClick={() => setSelected(item)}
                  key={index}
                >
                  <img
                    loading="lazy"
                    className={`${selected.id === item.id ? "active" : ""}`}
                    src={item.imageUrl}
                    alt={item.name}
                  />
                </div>
              ))}
          </Box>
        </div>
        <Link
          className="product--card--title"
          to={`/product-detail/${product.id}`}
        >
          {product.title}
        </Link>
        <p className="product--card--price">
          <span>
            <Price price={product.price} />
          </span>
          <b>
            <Price price={product.discountedPrice} />
          </b>
        </p>
      </div>
      <Modal
        onClose={handleCloseAuthClose}
        aria-labelledby="modal-modal-title"
        open={isAuthenticated}
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px" }}>
          {location.pathname !== "/register" ? <AuthLogin /> : <AuthRegister />}
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Carousel emulateTouch={true}>
            {product.colors.map((color) => (
              <div key={color.id}>
                <img loading="lazy" src={color.imageUrl} alt={color.name} />
              </div>
            ))}
          </Carousel>
          <div className="product--card--model--info">
            <p className="product--card--model--info--title">{product.title}</p>
            <p className="product--card--model--info--price">
              <span>
                <Price price={product.price} />
              </span>
              <span>
                <Price price={product.discountedPrice} />
              </span>
              <span>-{product.discountPersent}%</span>
            </p>
            <div className="product--card--model--info--colors">
              {product.colors.map((color) => (
                <Button key={color.id} onClick={() => setSelected(color)}>
                  <img
                    loading="lazy"
                    className="img-fluid"
                    src={color.imageUrl}
                    alt={color.name}
                  />
                </Button>
              ))}
            </div>
            <div className="product--card--model--info--sizes">
              {selected.sizes.map((size) =>
                selectedSize === size.name ? (
                  <Typography
                    component="span"
                    sx={{
                      border: "1px solid black",
                      margin: "0 4px",
                      padding: "2px 4px",
                    }}
                    onClick={() => setSelectedSize(size.name)}
                    key={size.name}
                  >
                    {size.name}
                  </Typography>
                ) : (
                  <span
                    onClick={() => setSelectedSize(size.name)}
                    key={size.name}
                  >
                    {size.name}
                  </span>
                )
              )}
            </div>
            <Box className="product--card--quantity">
              <Typography style={{ fontSize: "14px" }}>Số lượng: </Typography>
              <div className="d-flex" style={{ margin: "10px 0" }}>
                <Button
                  className="product--card--quantity--toggle"
                  onClick={() => setQuantity(quantity - 1)}
                  disabled={quantity <= 1}
                  style={{ fontSize: "1.5rem" }}
                >
                  -
                </Button>
                <TextField
                  InputProps={{
                    style: { fontSize: 14 },
                  }}
                  variant="outlined"
                  value={quantity}
                  onChange={(e) => setQuantity(Number(e.target.value))}
                />
                <Button
                  className="product--card--quantity--toggle"
                  onClick={() => setQuantity(quantity + 1)}
                  style={{ fontSize: "1.5rem" }}
                >
                  +
                </Button>
              </div>
              <p style={{ fontSize: "14px" }}>
                {selectedSize != null
                  ? selected.sizes.find((size) => size.name === selectedSize)
                      .quantity
                  : totalQuantity}{" "}
                sản phẩm có sẵn
              </p>
            </Box>
            <ButtonGroup
              className="button-group-end d-flex"
              style={{ gap: "10px" }}
            >
              <button
                className="btn btn-outline-dark"
                onClick={() => handleAddItem()}
                style={{ fontSize: "14px" }}
              >
                Thêm vào giỏ hàng
              </button>
              <button
                className="btn btn-dark "
                onClick={createCheckOut}
                style={{ fontSize: "14px", "&hover": {backgroundColor: "gray"} }}
              >
                Mua ngay
              </button>
            </ButtonGroup>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCard;
