import { Box, Button, Modal, Radio } from "@mui/material";
import React, { useEffect, useState } from "react";
import { GiPositionMarker } from "react-icons/gi";
import FormAddress from "../../../layout/FormAddress";
import { useSelector } from "react-redux";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "40%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
  "@media (max-width: 1200px)": {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  },
  "@media (max-width: 992px)": {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "60%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  },
  "@media (max-width: 768px)": {
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    boxShadow: 24,
    p: 3,
  },
  "@media (max-width: 576px)": {
    width: "90%",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    p: 2,
  },
};

const PaymentAddress = (props) => {
  const {auth} = useSelector(store=> store)
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => {
    setOpen(false);
    setState(false);
  };
  const [state, setState] = useState(false);
  const [method, setMethod] = useState({
    title: "",
    address: null,
    type: null,
  });
  const [address, setAddress] = useState(null);
  const handleOpenSubmit = (item, title, type) => {
    setState(true);
    setAddress(item);
    setMethod({address: item, title: title, type: type });
  };
  
  const changeAddress = () => {
    return props.auth.user.address
      .filter((item) => item.state != "Default")
      .map((item) => (
        <div className="address__card">
          <div>
            {item.name} | {"0328310272"} <Button>Cập nhật</Button>
          </div>
          <p>abc</p>
          <p>{item.state}</p>
        </div>
      ));
  };
  console.log(props)
  return (
    <div className="payment--address">
      <h3 className="payment--address--title">
        <GiPositionMarker size={15} /> Địa Chỉ Nhận Hàng
      </h3>
      {props && props.address && 
        <div className="payment--address--info">
          <p>
            <b>Tên: {props.address.name}</b> <br/>
            <b>Số điện thoại: (+84){props.address.mobile && props.address.mobile.slice(1)}</b> <br/>
            <b>Địa chỉ: {props.address.city}</b> <br/>
          </p>
          <Button variant="none" onClick={handleOpen}>
            Thay đổi
          </Button>
        </div>
      }
      <Modal
        className="modal--address--edit"
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          {!state ? (
            <div className="payment--address--list">
              <h3>Địa chỉ của tôi</h3>
              {auth.user && auth.user.address && auth.user.address.map((item, index) => (
                <Box
                  className="payment--address--card"
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                  key={index}
                >
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                  {props.address &&  <Radio
                      color="error"
                      checked={item.id == props.address.id}
                      onChange={() => props.setAddress(item)}
                    ></Radio>}
                   
                    <Box
                      className="payment--address--card--info"
                      sx={{ marginLeft: "1rem" }}
                    >
                      <p>
                        <b>{item.name}</b>
                        <span>(+84) {item.mobile.slice(1)}</span>
                      </p>
                      <p>{item.city}</p>
                      {item.state != "" && (
                        <span className="payment--address--card--info--default">
                          {item.state}
                        </span>
                      )}
                    </Box>
                  </Box>
                  <span
                    className="payment--address--card--update"
                    sx={{ color: "#c62828", cursor: "pointer" }}
                    onClick={() =>
                      handleOpenSubmit(item, "Sửa địa chỉ", "update")
                    }
                  >
                    Cập nhật
                  </span>
                </Box>
              ))}
              <Button
                variant="outlined"
                color="error"
                onClick={() =>
                  handleOpenSubmit({
                    name: "",
                    mobile: "",
                    province: [],
                    district: [],
                    ward: [],
                    description: "",
                    state: "",
                  }, "Thêm địa chỉ", "create")
                }
              >
                + Thêm địa chỉ mới
              </Button>
            </div>
          ) : (
            <FormAddress
              type={method.type}
              address={method.address}
              handleClose={setState}
              title={method.title}
              open={open}
            ></FormAddress>
          )}
        </Box>
      </Modal>
    </div>
  );
};

export default PaymentAddress;
