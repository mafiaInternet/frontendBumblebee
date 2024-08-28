import { Box } from "@mui/material";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../state/cart/Action";

import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Carousel } from "react-responsive-carousel";
import { Price } from "../../../config/config";

import "../style.css";

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
  const dispatch = useDispatch();
  const [selected, setSelected] = useState(product && product.colors[0]);
  const [selectedSize, setSelectedSize] = useState(
    product && product.colors[0].sizes[0].name
  );
  const [quantity, setQuantity] = useState(1);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = () => {
    if (selectedSize == null) {
      alert("vale");
    } else {
      const data = {
        productId: product.id,
        color: selected.name,
        imageUrl: selected.imageUrl,
        size: selectedSize,
        quantity: quantity,
      };

      setOpen(false);
      dispatch(addItemToCart(data));
    }
  };

  return (
    <div className="product--card hover-div" key={product.id}>
      <div className="product--card--image">
        <div className="product--card--image--wrapper">
          <Link to={`/product-detail/${product.id}`}>
            <img src={selected.imageUrl}></img>
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
        <div className="product--card--colors ">
          <Box sx={{ display: "flex" }}>
            {product &&
              product.colors.map((item, index) => (
                <div
                  className="product--card--colors--item"
                  onClick={() => setSelected(item)}
                  key={index}
                >
                  <img
                    className={`${selected.id === item.id ? "active" : ""}`}
                    src={item.imageUrl}
                  ></img>
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
            <Price price={product.price}></Price>
          </span>
          <b>
            <Price price={product.discountedPrice}></Price>
          </b>
        </p>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Carousel emulateTouch={true}>
            {product.colors.map((color) => (
              <div>
                <img src={color.imageUrl}></img>
              </div>
            ))}
          </Carousel>

          <div className="product--card--model--info">
            <p className="product--card--model--info--title">{product.title}</p>
            <p className="product--card--model--info--price">
              <span>
                <Price price={product.price}></Price>
              </span>
              <span>
                <Price price={product.discountedPrice}></Price>
              </span>
              <span>-{product.discountPersent}%</span>
            </p>
            <div className="product--card--model--info--colors">
              {product.colors.map((color) => (
                <Button>
                  <img className="img-fluid" src={color.imageUrl}></img>
                </Button>
              ))}
            </div>
            <div className="product--card--model--info--sizes">
              {selected.sizes.map((size) =>
                selectedSize === size.name ? (
                  <Typography
                    component="span"
                    sx={{ border: "1px solid black" }}
                    onClick={() => setSelectedSize(size.name)}
                  >
                    {size.name}
                  </Typography>
                ) : (
                  <span onClick={() => setSelectedSize(size.name)}>
                    {size.name}
                  </span>
                )
              )}
            </div>
            <button
              className="product--card--model--info--addItemCart"
              onClick={() => handleAddItem()}
            >
              Thêm vào giỏ hàng
            </button>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default ProductCard;
