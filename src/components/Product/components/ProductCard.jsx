import { Box, Grid } from "@mui/material";
import React, { useState } from "react";

import { Link } from "react-router-dom";
import ShoppingCartCheckoutIcon from "@mui/icons-material/ShoppingCartCheckout";
import { useDispatch } from "react-redux";
import { addItemToCart } from "../../../state/cart/Action";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { Carousel } from "react-responsive-carousel";

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
  const [selectedSize, setSelectedSize] = useState(product && product.colors[0].sizes[0].name)
  const [quantity, setQuantity] = useState(1)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleAddItem = () => {
    console.log("abc");
    if(selectedSize == null){

      alert("vale")
    }else{
      const data = {productId: product.id, color: selected.name, imageUrl: selected.imageUrl, size: selectedSize, quantity: quantity}

      setOpen(false)
      dispatch(addItemToCart(data))
    }
  };

  return (
    <div className="product__card" key={product.id}>
      <div className="product__card__image">
        <div className="product__card__image__wrapper">
          <Link to={`/product-detail/${product.id}`}>
            <img src={selected.imageUrl}></img>
          </Link>
          <span
            className="product__card__image__wrapper__persent"
     
          >
            -{product.discountPersent}%
          </span>
          <div className="product__card__image__wrapper__cart">
            <span onClick={() => dispatch(addItemToCart(product.id))}>
              <FavoriteBorderIcon></FavoriteBorderIcon>
            </span>
            <Button onClick={handleOpen}>Mua hàng</Button>
         
       
          </div>
        </div>
      </div>
      <Box>
        <div className="product__card__colors ">
          <Grid container spacing={1} sx={{ justifyContent: "center" }}>
            {product &&
              product.colors.map((item) => (
                <Grid item xs={1.5} onClick={() => setSelected(item)}>
                  <span className="product__card__colors__image">
                    <span className="product__card__colors__image__wrapper">
                      <img
                        className={`${selected.id === item.id ? "active" : ""}`}
                   
                        src={item.imageUrl}
                      ></img>
                    </span>
                  </span>
                </Grid>
              ))}
          </Grid>
        </div>
        <Link
          className="product__card__title"
          to={`/product-detail/${product.id}`}
        >
          {product.title}
        </Link>
        <p className="product__card__price">
          <span>{product.price}.000đ</span>
          <b>{product.discountedPrice}.000đ</b>
        </p>
      </Box>
      <Modal
              open={open}
              onClose={handleClose}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Carousel  emulateTouch={true} >
                  {product.colors.map((color) => (
                    <div>
                      <img src={color.imageUrl}></img>
                    </div>
                  ))}
                </Carousel>

                <div className="product__card__model__info">
                <p className="product__card__model__info__title">{product.title}</p>
                <p className="product__card__model__info__price">
                  <span>{product.price} ₫</span>
                  <span>{product.discountedPrice} ₫</span>
                  <span>-{product.discountPersent}%</span>
                </p>
                <div className="product__card__model__info__colors">
                {product.colors.map((color) => (

                      <Button>
                        <img className="img-fluid" src={color.imageUrl}></img>
                      </Button>
            
                ))}
                </div>
                <div className="product__card__model__info__sizes">
                      { selected.sizes.map((size) => 
                        (selectedSize === size.name ? <Typography component='span' sx={{border: "1px solid black"}} onClick={() => setSelectedSize(size.name)}>{size.name}</Typography>
                        : <span onClick={() => setSelectedSize(size.name)}>{size.name}</span>
                        )
                      )}
                    </div>
                <button className="product__card__model__info__addItemCart"   onClick={() => handleAddItem()}>Thêm vào giỏ hàng</button>
                </div>
              </Box>
            </Modal>
    </div>
  );
};

export default ProductCard;
