import { Box, Button, Modal, TextField } from "@mui/material";
import React, { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useDispatch } from "react-redux";
import { createOrder } from "../../../state/order/Action";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

const PaymentQr = (props) => {
  const dispatch = useDispatch()
  const [open, setOpen] = useState(false);

  const [openQr, setOpenQr] = useState({
    qr: false,
    success: false,
    failure: false,
  });

  const [content, setContent] = useState()
  const handleOpen = () => {
    showQr();
    setSeconds(0)
    setMinutes(10)
  };

  const showQr = () => {

    setOpen(true);
    setOpenQr({
      qr: true,
      success: false,
      failure: false,
    });
  };

  const handleClose = (timeout) => {
    setOpen(false);
    clearInterval(timeout);
  };

  const [minutes, setMinutes] = useState();
  const [seconds, setSeconds] = useState();
  
  useEffect(() => {
    let timeout = null;
    if (open && minutes > 0 && seconds > 0) {
      timeout = setInterval(() => {
        console.log(seconds);
        setSeconds((seconds) => seconds - 1);
        // checkpaid()
      }, 1000);
    }

    if (seconds === 0) {
      setSeconds(59);
      setMinutes((minutes) => minutes - 1);
    }

    if (seconds == 0 && minutes == 0) {
      clearTimeout(timeout);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [open, openQr.qr, openQr.success, minutes, seconds]);

  const checkpaid = async (timeout) => {

    try {
      const respone = await fetch(
        "https://script.google.com/macros/s/AKfycbyAXRBRoTMZTOBwHxU3FR6UrcuOCqRusJHMUquTEvqU5FHb5jM5yRdUmFE3QOuFsdY/exec"
      );
      const data = await respone.json();
      const lastPaid = data.data[data.data.length - 1];
      if (0 <= lastPaid["Giá trị"]) {
        const data = {
          cart: props.payment,
          address: props.address,
          paymentMethod: props.paymentType
            ? "Thanh toán online"
            : "Thanh toán khi nhận hàng",
          discountedPrice: props.discountedPrice,
        };
    
        dispatch(createOrder(data));
          setOpenQr({
              qr: false,
              success: true,
              failure: false,
            });
        setSeconds(0)
        setMinutes(0)
    
      } 
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>

      <Button variant="contained" color="error" onClick={handleOpen}>Lấy mã QR</Button> 
      <Modal
        className="payment-qr"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
     
        {openQr.qr ? (
          <Box sx={style}>
            <img
              className="img-fluid"
              src={`https://img.vietqr.io/image/MB-6311166668888-qr_only.png?amount=10000&addInfo=Phạm Đức Nhân`}
            ></img>
            <div className="payment-qr-content">
              <h5>Mã QR thanh toán tự động</h5>
              <p>
                Số Tiền: <strong>2.000.000</strong>
              </p>
              <p>Số Tài Khoản: <strong>6311166668888</strong></p>
              <p>Ngân hàng TMCP Quân đội</p>
              <Box sx={{display: "flex"}}>
              <TextField label="Mã giao dịch" onChange={(e) => setContent(e.target.value)} fullWidth></TextField>

              <Button onClick={() => checkpaid()}>Xác nhận</Button>
              </Box>
              <hr></hr>
              <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <p>Đang chờ thanh toán</p>
                <p>
                  {minutes}:{seconds}
                </p>
              </Box>
              <LinearProgress />
            </div>
          </Box>
        ) : openQr.success ? (
          <Box sx={style}>
            <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            <h5>Thanh toán thành công</h5>
          </Box>
        ) : (
          <Box sx={style}>
            <CheckCircleOutlineIcon></CheckCircleOutlineIcon>
            <h5>Thanh toán thất bai</h5>
          </Box>
        )}
      </Modal> 
    </div>
  );
};

export default PaymentQr;
