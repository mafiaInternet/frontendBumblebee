import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  Grid,
  Step,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  createCartItem,
  getCarts,
  removeItemToCart,
  updateItemTOCart,
} from "../../state/cart/Action";
import { Link, useLocation, useParams } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentIcon from "@mui/icons-material/Payment";
const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState(false);
  const [selected, setSelected] = useState([]);

  const location = useLocation()
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);
  // Select Cart Item
  const isSelected = (event, cartItem) => {
    const index = selected.findIndex(
      (item) => item.id === parseInt(event.target.value)
    );

    localStorage.setItem("cartItem", JSON.stringify(selected));
    if (index === -1) {
      setSelected([...selected, cartItem]);

      setTotalItem(totalItem + 1);
      setTotalPrice(totalPrice + cartItem.discountedPrice);
    } else {
      setSelected((selected) =>
        selected.filter((item) => item.id !== parseInt(event.target.value))
      );
      setTotalItem(totalItem - 1);
      setTotalPrice(totalPrice - cartItem.discountedPrice);
    }
  };

  const isSelectedAll = () => {
    if (selectedCartItems) {
      setSelected([]);

      setTotalPrice(0);
      setTotalItem(0);

    } else {
      setSelected(cart.cart.cartItems);
      let price = 0;
      cart.cart.cartItems.forEach((item) => {
        price += item.discountedPrice;
      });
      setTotalPrice(price);

      setTotalItem(cart.cart.cartItems.length);
    }
    setSelectedCartItems(!selectedCartItems)

  };

  // Delete Cart Item
  const deleteHandleCartItem = () => {


    const cartItemIds = [];

    selected.forEach((item) => {
      cartItemIds.push(item.id);
    });
    setTotalItem(0)
    setTotalPrice(0)
    dispatch(removeItemToCart(cartItemIds));
  };

  // Increase or Decrease quantity
  const updateCartItem = (active, cartItem) => {
    if (active === "-") {
      dispatch(
        updateItemTOCart({
          cartItemId: cartItem.id,
          quantity: cartItem.quantity - 1,
        })
      );
    } else if (active === "+") {
      dispatch(
        updateItemTOCart({
          cartItemId: cartItem.id,
          quantity: cartItem.quantity + 1,
        })
      );
    }
  };

  // Add item to payment
  const createCheckOut = () => {
    dispatch(createCartItem({ cartItems: selected }));
  };


  useEffect(() => {
    dispatch(getCarts());
  }, [jwt, auth.jwt]);

  return (
    <Box
      className="cart"
      sx={{
        width: { xs: "95%", md: "85%", lg: "75%", xl: "70%" },
        margin: "1rem auto",
      }}
    >
      <Stepper className="step" activeStep={activeStep}>
        <Step className="step__item">
          <Typography
            component="span"
            sx={{ color: location.pathname == "/cart" || location.pathname == "/payment" ? "#c62828" : undefined, fontSize: "2rem" } }
            className="step__item__lable"
          >
            <ShoppingCartOutlinedIcon sx={{fontSize: "3rem", marginRight: "1rem"}}></ShoppingCartOutlinedIcon>
            Giỏ hàng
          </Typography>
        </Step>
        <Step className="step__item">
        <Typography
            component="span"
            className="step__item__lable"
            sx={{ color: location.pathname == "/payment" ? "#c62828" : undefined, fontSize: "2rem" }}
          >
            <PaymentIcon sx={{fontSize: "3rem", marginRight: "1rem"}}></PaymentIcon>
            Đặt Hàng
          </Typography>
        </Step>
        <Step className="step__item">
          <Typography component='span' sx={{ color: location.pathname == "/success" ? "red" : undefined, fontSize: "2rem" }} className="step__item__lable">
            <CreditScoreIcon sx={{fontSize: "3rem", marginRight: "1rem"}}></CreditScoreIcon>
            Hoàn Thành Đơn Hàng
          </Typography>
        </Step>
      </Stepper>

      {cart.cart && cart.cart.cartItems ? (
        <div>
          <Table
            className="cart-table"
            sx={{ display: { xs: "none", md: "block" } }}
          >
            <TableHead className="cart-table-head">
              <TableRow>
                <TableCell align="center"></TableCell>
                <TableCell
                  align="left"
                  sx={{ width: { xl: "65%", lg: "60%", md: "55%" } }}
                >
                  Thông tin sản phẩm
                </TableCell>
                <TableCell align="center" width={"30%"}>
                  Số lượng
                </TableCell>

                <TableCell align="center">Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="cart-table-body">
              {cart.cart &&
                cart.cart.cartItems != null &&
                cart.cart.cartItems.map((cartItem, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        value={cartItem.id}
                        checked={selected
                          .map((item) => item.id)
                          .includes(cartItem.id)}
                        onChange={(e) => isSelected(e, cartItem)}
                      ></Checkbox>
                    </TableCell>
                    <TableCell align="left" className="d-flex">
                      <div className="cart-table-body-img">
                        <img
                          className="img-fluid"
                          src={cartItem.imageUrl}
                        ></img>
                      </div>
                      <div className="cart-text ms-3">
                        <p>{cartItem.product.title}</p>
                        <p>
                          Color:<strong> {cartItem.color} </strong>
                        </p>
                        <p>
                          Size: <strong> {cartItem.size}</strong>
                        </p>
                        <p>
                          <span>{cartItem.discountedPrice}</span>
                          <span>{cartItem.price}</span>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        className="cart-table-body-quantity"
                        sx={{
                          width: "50%",
                          margin: "0 auto",
                        }}
                      >
                        <button onClick={() => updateCartItem("-", cartItem)}>
                          -
                        </button>
                        <input
                          type="text"
                          className="cart-table-body-input"
                          value={cartItem.quantity}
                        ></input>
                        <button onClick={() => updateCartItem("+", cartItem)}>
                          +
                        </button>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <strong>
                        {cartItem.quantity * cartItem.product.discountedPrice}
                      </strong>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <Box sx={{ display: { md: "none" } }}>
            <Grid container spacing={1} sx={{ fontSize: "2rem" }}>
              <Grid item xs={1}></Grid>
              <Grid item sm={3} xs={4}>
                <p>Thông tin sản phẩm</p>
              </Grid>
              <Grid item sm={2.8} xs={4}></Grid>
              <Grid item sm={3.2}>
              
                <Typography
                  sx={{ display: { xs: "none", md: "block" } }}
                  component={"p"}
                >
                  Số lượng
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <p>Thành tiền</p>
              </Grid>
            </Grid>
            {cart.cart.cartItems &&
              cart.cart.cartItems.map((cartItem) => (
                <Grid container spacing={1} marginBottom={"1rem"}>
                  <Grid
                    item
                    xs={1}
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    <Checkbox
                      value={cartItem.id}
                      checked={selected
                        .map((item) => item.id)
                        .includes(cartItem.id)}
                      onChange={(e) => isSelected(e, cartItem)}
                    ></Checkbox>
                  </Grid>
                  <Grid item sm={2.1} xs={3}>
                    <div className="cart-table-body-img">
                      <img className="img-fluid" src={cartItem.imageUrl}></img>
                    </div>
                  </Grid>
                  <Grid item sm={3.7} xs={5}>
                    <div className="cart-text ms-2">
                      <p>{cartItem.product.title}</p>
                      <p>
                        Color:<strong> {cartItem.color} </strong>
                        Size: <strong> {cartItem.size}</strong>
                      </p>
                      <p>
                          <span>{cartItem.discountedPrice}</span>
                          <span>{cartItem.price}</span>
                        </p>
                    </div>
                    <Box
                      sx={{
                        display: { xs: "block", md: "none" },
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                      className="cart-table-body-quantity"
                    >
                      <button onClick={() => updateCartItem("-", cartItem)}>
                        -
                      </button>
                      <input
                        type="text"
                        className="cart-table-body-input"
                        value={cartItem.quantity}
                      ></input>
                      <button onClick={() => updateCartItem("+", cartItem)}>
                        +
                      </button>
                    </Box>
                  </Grid>
                  <Grid item sm={3.2}>
                    <Box
                      sx={{
                        display: { xs: "none", sm: "flex" },
                        justifyContent: "start",
                        alignItems: "center",
                      }}
                      className="cart-table-body-quantity"
                    >
                      <button onClick={() => updateCartItem("-", cartItem)}>
                        -
                      </button>
                      <input
                        type="text"
                        className="cart-table-body-input"
                        value={cartItem.quantity}
                      ></input>
                      <button onClick={() => updateCartItem("+", cartItem)}>
                        +
                      </button>
                    </Box>
                  </Grid>
                  <Grid item sm={1} xs={1}>
                    <strong>
                      {cartItem.quantity * cartItem.product.discountedPrice}
                    </strong>
                  </Grid>
                </Grid>
              ))}
          </Box>
          <div className="cart-payment">
            <div className="d-flex justify-content-between">
              <FormControlLabel
                label="Chọn tất cả"
                control={
                  <Checkbox
                    checked={selectedCartItems}
                    onClick={isSelectedAll}
                  ></Checkbox>
                }
              ></FormControlLabel>
              <Button onClick={() => deleteHandleCartItem()}>Xóa</Button>
              <Typography sx={{ marginTop: "1rem!important" }}>
                Tổng thanh toán ({totalItem}) sản phẩm
              </Typography>
              <Typography>
                <strong>
                  <sup>&#273;</sup>
                  {totalPrice}.000
                </strong>
           
                  <p>
                  Tiết kiệm:
                  <strong>
                    <sup>&#273;</sup>{selected.length > 0 ? selected.reduce((acc, curr) => acc + (curr.price - curr.discountedPrice), 0) : 0}k
                  </strong>
                </p>
     
                
              </Typography>
              <Button>
                <Link to="/payment" onClick={(e) => createCheckOut(e)}>
                  Thanh toán
                </Link>
              </Button>
            </div>
          </div>
        </div>
      ) : (
        <div className="container" style={{ textAlign: "center" }}>
          <img src="https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-1/274600075_4635088983268155_3773662559283287833_n.jpg?stp=dst-jpg_p100x100&_nc_cat=108&ccb=1-7&_nc_sid=596444&_nc_eui2=AeFRxCrj3SVeDWzQEHrHSLQATfwYUKBE0s9N_BhQoETSz0fWb1dy6VHOxy6z5p31619IdJQi68gjQWZdZSj0BEOr&_nc_ohc=il2d6Ks8mcMAX_KSyDq&_nc_ht=scontent.fhan2-3.fna&oh=00_AfC3U-svmHXac9-buLPPr7OnTHxL_c19Db68AiDKuikQbw&oe=658FE9EB"></img>
          <h5>Không có sản phẩm nào trong giỏ hàng của bạn</h5>
        </div>
      )}
    </Box>
  );
};

export default Cart;
