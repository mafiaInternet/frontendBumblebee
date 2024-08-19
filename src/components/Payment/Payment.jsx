import React, { useEffect, useState } from "react";

import {
  Box,
  Button,
  Step,
  Stepper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";

import { useDispatch, useSelector } from "react-redux";
import { User } from "../../state/auth/Action";
import { checkout, createOrder } from "../../state/order/Action";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Voucher from "../../layout/Voucher";
import PaymentQr from "./components/PaymentQr";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import CreditScoreIcon from "@mui/icons-material/CreditScore";
import PaymentIcon from "@mui/icons-material/Payment";

import PaymentAddress from "./components/PaymentAddress";
import FormAddress from "../../layout/FormAddress";
import { handleGetVouchers } from "../../state/voucher/Action";
import { Price } from "../../config/config";
import { toast } from "react-toastify";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate()
  const [paymentType, setPaymentType] = useState(false);
  const dispatch = useDispatch();

  const { auth, voucher,order } = useSelector((store) => store);
  const [selected, setSelected] = useState(-1);
  const isSelectedVoucher = (voucher) => {
    if (voucher.id !== selected.id) {
      setSelected(voucher);
      setTotolPrice(totolPrice - (voucher.discountedPrice > 0
        ? voucher.discountedPrice
        : (voucher.discountedPersent *
            payment.totalDiscountedPrice) /
          100))
    } else {
      setSelected(-1);
      setTotolPrice(totolPrice + (selected.discountedPrice > 0
        ? selected.discountedPrice
        : (selected.discountedPersent *
            payment.totalDiscountedPrice) /
          100))
    }
  };
  const payment = JSON.parse(localStorage.getItem("demo"));
  const [totolPrice, setTotolPrice] = useState(payment && payment.totalDiscountedPrice)
  const jwt = localStorage.getItem("jwt");
  const [address, setAddress] = useState({
    name: "",
    mobile: "",
    province: "",
    district: "",
    ward: "",
    description: "",
    state: "",
  });
  const checkedOutOffline = () => {
    const data = {
      cart: payment,
      address: address,
      paymentMethod: paymentType
        ? "Thanh toán online"
        : "Thanh toán khi nhận hàng",
      discountedPrice: selected != -1 ? selected.discountedPrice : 0,
    };
    dispatch(createOrder(data));

  };

  useEffect(() => {
    if (jwt) {
      dispatch(User(jwt));
    }
    dispatch(handleGetVouchers());
  }, [dispatch, jwt]);

  useEffect(() => {
    if (auth.user && auth.user.address) {
      setAddress(auth.user.address.find((item) => item.state === "Mặc định"));

    }
  }, [auth.user]);

  useEffect(() => {
    console.log(order)
    if (order && order.order && order.error == null) {
      navigate(`/account/order/${order.order.id}`);
      toast.success('Đặt hàng thành công !!!');
    } else if (order && order.error) {
      console.log(order)
      toast.error('Đặt hàng thất bại !!!');
    }
  }, [order]);

  return (
    payment &&
    auth.user &&
    auth.user.address && (
      <div className="payment">
        <Box className="container" sx={{ marginBottom: "180px" }}>
          <Stepper
            className="step"
            sx={{ backgroundColor: "white", padding: "1rem" }}
          >
            <Step className="step__item">
              <Typography
                component="span"
                sx={{
                  color:
                    location.pathname == "/cart" ||
                    location.pathname == "/payment"
                      ? "#c62828"
                      : undefined,
                  fontSize: { lg: "2rem", xs: "1.5rem" },
                }}
                className="step__item__lable"
              >
                <ShoppingCartOutlinedIcon
                  sx={{ fontSize: "3rem", marginRight: "1rem" }}
                ></ShoppingCartOutlinedIcon>
                Giỏ hàng
              </Typography>
            </Step>
            <Step className="step__item">
              <Typography
                component="span"
                className="step__item__lable"
                sx={{
                  color:
                    location.pathname == "/payment" ? "#c62828" : undefined,
                  fontSize: "2rem",
                }}
              >
                <PaymentIcon
                  sx={{ fontSize: "3rem", marginRight: "1rem" }}
                ></PaymentIcon>
                Đặt Hàng
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
                <CreditScoreIcon
                  sx={{ fontSize: "3rem", marginRight: "1rem" }}
                ></CreditScoreIcon>
                Hoàn Thành Đơn Hàng
              </Typography>
            </Step>
          </Stepper>
          {jwt ? (
            <PaymentAddress
              address={address}
              setAddress={setAddress}
            ></PaymentAddress>
          ) : (
            <FormAddress
              address={address}
              title={"Thông tin nhận hàng"}
            ></FormAddress>
          )}

          <div className="payment__method">
            Phương thức thanh toán
            <Button
              variant={paymentType ? "contained" : "outlined"}
              color="error"
              onClick={() => setPaymentType(true)}
            >
              Thanh toán online
            </Button>
            <Button
              variant={!paymentType ? "contained" : "outlined"}
              color="error"
              onClick={() => setPaymentType(false)}
            >
              Thanh toán khi nhận hàng
            </Button>
          </div>
          <div className="payment__orders">
            <TableContainer>
              <Table className="payment__orders__table">
                <TableHead className="payment__orders__table__head">
                  <TableRow>
                    <TableCell align="left">Sản phẩm</TableCell>
                    <TableCell align="center">Đơn giá</TableCell>

                    <TableCell align="center">Số lượng</TableCell>
                    <TableCell align="center">Thành tiền</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody className="payment__orders__table__body">
                  {payment.cartItems.map((orderItem, index) => (
                    <TableRow key={index}>
                      <TableCell className="d-flex" align="left">
                        <img
                          className="img-fluid"
                          src={orderItem.imageUrl}
                        ></img>
                        <div className="options">
                          <p>{orderItem.product.title}</p>
                          <p>
                            {orderItem.color} /{orderItem.size}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell align="center">
                        <p><Price price={orderItem.product.price}></Price></p>
                        <p><Price price={orderItem.product.discountedPrice}></Price></p>
                      </TableCell>

                      <TableCell align="center">{orderItem.quantity}</TableCell>
                      <TableCell align="center">
                      <Price price={orderItem.discountedPrice}></Price>
       
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
          <div className="payment__voucher">
            {voucher.vouchers.map((voucher, index) => (
              <Voucher
                voucher={voucher}
                key={index}
                selected={selected}
                isSelectedVoucher={isSelectedVoucher}
              ></Voucher>
            ))}
          </div>
        </Box>
        <div className="payment__price">
          <Box
            className="container"
            sx={{ display: "flex", justifyContent: "end", alignItems: "end" }}
          >
            <div className="payment__price__info">
              <p>
                <span>Tổng tiền hàng</span>
                <span>Phí vận chuyển</span>
                {selected != -1 && <span>Giảm giá từ voucher</span>}
                <span>Tổng thanh toán</span>
              </p>
              <p>
                <span><Price price={payment.totalDiscountedPrice}></Price></span>
                <span><Price price={20000}></Price></span>
                {selected != -1 && (
                  <span>- <Price price={selected.discountedPrice}></Price></span>
                )}
                <span>
                <Price price={totolPrice}></Price>
                </span>
              </p>
            </div>
          </Box>
          <hr></hr>
          <div className="payment__price__order">
            <p>
              Nhấn "Đặt hàng" đồng nghĩa với việc bạn đồng ý tuần theo{" "}
              <Link to="/policy">Chính sách Teelab</Link>
            </p>
            {!paymentType ? (
              <Button
                variant="contained"
                color="error"
                onClick={checkedOutOffline}
              >
                Đặt hàng
              </Button>
            ) : (
              <PaymentQr payment={payment} paymentType={paymentType} address={address} discountedPrice={selected.discountedPrice}></PaymentQr>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Payment;
