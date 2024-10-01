import { Box, Button, Checkbox, FormControlLabel, Grid, Step, Stepper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCartItem, getCarts, removeItemToCart, updateItemTOCart } from "../../state/cart/Action";
import { Link, useLocation } from "react-router-dom";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentIcon from "@mui/icons-material/Payment";
import { Price } from "../../config/config";

const Cart = () => {
  const [selectedCartItems, setSelectedCartItems] = useState(false);
  const [selected, setSelected] = useState([]);
  const location = useLocation();
  const [totalItem, setTotalItem] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [activeStep, setActiveStep] = useState(1);
  const jwt = localStorage.getItem("jwt");
  const dispatch = useDispatch();
  const { cart, auth } = useSelector((store) => store);



  const isSelected = (event, cartItem) => {
    const index = selected.findIndex(
      (item) => item.id === parseInt(event.target.value)
    );
    if (index === -1) {
      setSelected([...selected, cartItem]);
      setTotalItem(totalItem + 1);
      let total = totalPrice + cartItem.discountedPrice
      setTotalPrice(total);
    } else {
      setSelected((selected) =>
        selected.filter((item) => item.id !== parseInt(event.target.value))
      );
      setTotalItem(totalItem - 1);
      let total = totalPrice - cartItem.discountedPrice
      setTotalPrice(total);
    }
  };
console.log(selected)
console.log(selectedCartItems)

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
    setSelectedCartItems(!selectedCartItems);
  };

  const deleteHandleCartItem = async () => {



    let cartItemIds = [];
    selected.forEach((item) => {
      cartItemIds.push(item.id);
    });
    const jwt = localStorage.getItem("jwt")
    try {
      const response = await fetch('http://localhost:8080/cart/cartItem/delete', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${jwt}`
        },
        body: JSON.stringify(cartItemIds), // Chuyển đổi mảng thành chuỗi JSON
      });
  
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
  
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error:', error);
    }

    // console.log([1,2,3,4])
    // dispatch(removeItemToCart(cartItemIds));
    // setTotalItem(cart.cart.totalItem - selected.length);
    // // selected.forEach((item) => {
    // //   totalPrice -= item.discountedPrice;
    // // });
    // setTotalPrice(totalPrice);
  };

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

  const createCheckOut = () => {
    dispatch(createCartItem({ cartItems: selected }));
  };

  useEffect(() => {
    dispatch(getCarts());
  }, [jwt, auth.jwt]);
console.log(cart.cart)
  return (
    <Box
      className="cart"
      sx={{
        width: { xs: "100%", md: "85%", lg: "75%", xl: "70%" },
        margin: "30px auto",
      }}
    >
      <Stepper className="step" activeStep={activeStep}>
        <Step className="step__item">
          <Typography
            component="span"
            sx={{
              color: location.pathname == "/cart" || location.pathname == "/payment" ? "#c62828" : undefined,
              fontSize: "2rem",
            }}
            className="step__item__lable"
          >
            <ShoppingCartOutlinedIcon sx={{ fontSize: "5rem" }} />
            <Box>Giỏ hàng</Box>
          </Typography>
        </Step>
        <Step className="step__item">
          <Typography
            component="span"
            className="step__item__lable"
            sx={{
              color: location.pathname == "/payment" ? "#c62828" : undefined,
              fontSize: "2rem",
            }}
          >
            <PaymentIcon sx={{ fontSize: "5rem" }} />
            <Box>Đặt Hàng</Box>
          </Typography>
        </Step>
        <Step className="step__item">
          <Typography
            component="span"
            sx={{
              color: location.pathname == "/success" ? "red" : undefined,
              fontSize: "2rem",
            }}
            className="step__item__lable"
          >
            <CreditScoreIcon sx={{ fontSize: "5rem" }} />
            <Box>Hoàn Thành Đơn Hàng</Box>
          </Typography>
        </Step>
      </Stepper>
      {cart.cart && cart.cart.cartItems && cart.cart.cartItems.length > 0 ? (
        <div>
          <Table
            className="cart-table"
            sx={{ display: { xs: "block", md: "block" } }}
          >
            <TableHead className="cart-table-head">
              <TableRow>
                <TableCell align="center" />
                <TableCell
                  align="left"
                  sx={{ width: { xl: "65%", lg: "60%", md: "45%", sx:"40%" } }}
                >
                  Thông tin sản phẩm
                </TableCell>
                <TableCell align="center" width={{lg:"30%", md:"40%", sx:"40%"}}>
                  Số lượng
                </TableCell>
                <TableCell align="center">Thành tiền</TableCell>
              </TableRow>
            </TableHead>
            <TableBody className="cart-table-body">
              {cart.cart &&
                cart.cart.cartItems != null &&
                cart.cart.cartItems.sort((a, b) => a.id - b.id).map((cartItem, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <Checkbox
                        value={cartItem.id}
                        checked={selected
                          .map((item) => item.id)
                          .includes(cartItem.id)}
                        onChange={(e) => isSelected(e, cartItem)}
                      />
                    </TableCell>
                    <TableCell 
                      align="left" 
                      className="d-flex" 
                      sx={{ "@media (max-width: 580px)": {
                        width: "212px",
                      }}}
                    >
                      <div className="cart-table-body-img d-flex align-items-center">
                        <img loading="lazy" className="img-fluid" src={cartItem.imageUrl} />
                      </div>
                      <div className="cart-text ms-3">
                        <p>{cartItem.product.title}</p>
                        <p>Color:<strong> {cartItem.color} </strong></p>
                        <p>Size: <strong> {cartItem.size}</strong></p>
                        <p>
                          <span className="cart--item--discountedPrice">
                            <Price price={cartItem.product.discountedPrice} />
                          </span>
                          <span className="cart--item--price">
                            <Price price={cartItem.product.price}></Price>
                          </span>
                        </p>
                      </div>
                    </TableCell>
                    <TableCell align="center">
                      <Box 
                        className="cart-table-body-quantity" 
                        sx={{ 
                          width: "50%", 
                          margin: "0 auto",
                          "@media (max-width: 700px)": {
                            width: "100%",
                          },
                        }}
                      >
                        <button onClick={() => updateCartItem("-", cartItem)}>
                          -
                        </button>
                        <input type="text" className="cart-table-body-input" value={cartItem.quantity} />
                        <button onClick={() => updateCartItem("+", cartItem)}>
                          +
                        </button>
                      </Box>
                    </TableCell>
                    <TableCell align="center">
                      <span className="cart--item--totalPrice">
                        <Price price={cartItem.quantity * cartItem.product.discountedPrice} />
                      </span>
                    </TableCell>
                  </TableRow>
                ))}
            </TableBody>
          </Table>
          <div className="cart-payment">
            <div className="d-flex justify-content-between">
              <FormControlLabel
                label="Chọn tất cả"
                control={
                  <Checkbox checked={selectedCartItems} onClick={isSelectedAll} hidden/>
                }
              />
              <Button onClick={() => deleteHandleCartItem()} color="error" style={{ fontSize: "14px", marginRight: "5px" }}>Xóa</Button>
              <Typography sx={{ marginTop: "1rem!important" }}>
                Tổng thanh toán ({totalItem} sản phẩm)
              </Typography>
              <Typography>
                Tổng:
                <strong>
                  <Price price={totalPrice} />
                </strong>
                <p>
                  Tiết kiệm:
                  <strong>
                    <sup>&#273;</sup>
                    {selected.length > 0 ?
                      selected.reduce((acc, curr) => acc + (curr.price - curr.discountedPrice), 0) : 0
                    }
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
          <Box
            sx={{ display: "flex", justifyContent: "center", margin: "2rem 0" }}
          >
            <Box sx={{ width: "10rem" }}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                id="Capa_1"
                x="0px"
                y="0px"
                viewBox="0 0 201.387 201.387"
              >
                {" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M129.413,24.885C127.389,10.699,115.041,0,100.692,0C91.464,0,82.7,4.453,77.251,11.916    c-1.113,1.522-0.78,3.657,0.742,4.77c1.517,1.109,3.657,0.78,4.768-0.744c4.171-5.707,10.873-9.115,17.93-9.115    c10.974,0,20.415,8.178,21.963,19.021c0.244,1.703,1.705,2.932,3.376,2.932c0.159,0,0.323-0.012,0.486-0.034    C128.382,28.479,129.679,26.75,129.413,24.885z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M178.712,63.096l-10.24-17.067c-0.616-1.029-1.727-1.657-2.927-1.657h-9.813c-1.884,0-3.413,1.529-3.413,3.413    s1.529,3.413,3.413,3.413h7.881l6.144,10.24H31.626l6.144-10.24h3.615c1.884,0,3.413-1.529,3.413-3.413s-1.529-3.413-3.413-3.413    h-5.547c-1.2,0-2.311,0.628-2.927,1.657l-10.24,17.067c-0.633,1.056-0.648,2.369-0.043,3.439s1.739,1.732,2.97,1.732h150.187    c1.231,0,2.364-0.662,2.97-1.732S179.345,64.15,178.712,63.096z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M161.698,31.623c-0.478-0.771-1.241-1.318-2.123-1.524l-46.531-10.883c-0.881-0.207-1.809-0.053-2.579,0.423    c-0.768,0.478-1.316,1.241-1.522,2.123l-3.509,15c-0.43,1.835,0.71,3.671,2.546,4.099c1.835,0.43,3.673-0.71,4.101-2.546    l2.732-11.675l39.883,9.329l-6.267,26.795c-0.43,1.835,0.71,3.671,2.546,4.099c0.263,0.061,0.524,0.09,0.782,0.09    c1.55,0,2.953-1.062,3.318-2.635l7.045-30.118C162.328,33.319,162.176,32.391,161.698,31.623z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M102.497,39.692l-3.11-26.305c-0.106-0.899-0.565-1.72-1.277-2.28c-0.712-0.56-1.611-0.816-2.514-0.71l-57.09,6.748    c-1.871,0.222-3.209,1.918-2.988,3.791l5.185,43.873c0.206,1.737,1.679,3.014,3.386,3.014c0.133,0,0.27-0.009,0.406-0.024    c1.87-0.222,3.208-1.918,2.988-3.791l-4.785-40.486l50.311-5.946l2.708,22.915c0.222,1.872,1.91,3.202,3.791,2.99    C101.379,43.261,102.717,41.564,102.497,39.692z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M129.492,63.556l-6.775-28.174c-0.212-0.879-0.765-1.64-1.536-2.113c-0.771-0.469-1.696-0.616-2.581-0.406L63.613,46.087    c-1.833,0.44-2.961,2.284-2.521,4.117l3.386,14.082c0.44,1.835,2.284,2.964,4.116,2.521c1.833-0.44,2.961-2.284,2.521-4.117    l-2.589-10.764l48.35-11.626l5.977,24.854c0.375,1.565,1.775,2.615,3.316,2.615c0.265,0,0.533-0.031,0.802-0.096    C128.804,67.232,129.932,65.389,129.492,63.556z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M179.197,64.679c-0.094-1.814-1.592-3.238-3.41-3.238H25.6c-1.818,0-3.316,1.423-3.41,3.238l-6.827,133.12    c-0.048,0.934,0.29,1.848,0.934,2.526c0.645,0.677,1.539,1.062,2.475,1.062h163.84c0.935,0,1.83-0.384,2.478-1.062    c0.643-0.678,0.981-1.591,0.934-2.526L179.197,64.679z M22.364,194.56l6.477-126.293h143.701l6.477,126.293H22.364z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M126.292,75.093c-5.647,0-10.24,4.593-10.24,10.24c0,5.647,4.593,10.24,10.24,10.24c5.647,0,10.24-4.593,10.24-10.24    C136.532,79.686,131.939,75.093,126.292,75.093z M126.292,88.747c-1.883,0-3.413-1.531-3.413-3.413s1.531-3.413,3.413-3.413    c1.882,0,3.413,1.531,3.413,3.413S128.174,88.747,126.292,88.747z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M75.092,75.093c-5.647,0-10.24,4.593-10.24,10.24c0,5.647,4.593,10.24,10.24,10.24c5.647,0,10.24-4.593,10.24-10.24    C85.332,79.686,80.739,75.093,75.092,75.093z M75.092,88.747c-1.882,0-3.413-1.531-3.413-3.413s1.531-3.413,3.413-3.413    s3.413,1.531,3.413,3.413S76.974,88.747,75.092,88.747z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g>
                  {" "}
                  <g>
                    {" "}
                    <path d="M126.292,85.333h-0.263c-1.884,0-3.413,1.529-3.413,3.413c0,0.466,0.092,0.911,0.263,1.316v17.457    c0,12.233-9.953,22.187-22.187,22.187s-22.187-9.953-22.187-22.187V88.747c0-1.884-1.529-3.413-3.413-3.413    s-3.413,1.529-3.413,3.413v18.773c0,15.998,13.015,29.013,29.013,29.013s29.013-13.015,29.013-29.013V88.747    C129.705,86.863,128.176,85.333,126.292,85.333z"></path>{" "}
                  </g>{" "}
                </g>{" "}
                <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g> <g> </g>{" "}
                <g> </g>{" "}
              </svg>
            </Box>
          </Box>
          <h5>Không có sản phẩm nào trong giỏ hàng của bạn</h5>
        </div>
      )}
    </Box>
  );
};

export default Cart;