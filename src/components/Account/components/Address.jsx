import {
  Box,
  Button,
  InputAdornment,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  addAddress,
  deleteAddressByUser,
  getAddressByUser,
  updateAddressByUser,
  updateAddressDefault,
} from "../../../state/address/Action";
import Modal from "@mui/material/Modal";
import FormAddress from "../../../layout/FormAddress";
import PersonIcon from "@mui/icons-material/Person";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import HomeIcon from "@mui/icons-material/Home";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  height: 370,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const styles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  height: 150,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};
const Address = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth, address } = useSelector((store) => store);
  const dispath = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  const addAddressHandle = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const responeData = {
      name: data.get("name"),
      mobile: data.get("mobile"),
      city: data.get("city"),
      state: data.get("state") == "true" ? "Mặc định" : "",
    };
    console.log(responeData);
    dispath(addAddress(responeData));
    handleClose();
  };
  const [openDeleteHandle, setOpenDeleteHandle] = React.useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteHandle(true);
  };
  const handleCloseDelete = () => setOpenDeleteHandle(false);

  const deleteAddress = (addressId) => {
    console.log("deme");
    setOpenDeleteHandle(false);
    dispath(deleteAddressByUser(addressId));
  };

  const [openUpdateHandle, setOpenUpdateHandle] = React.useState(false);

  const handleOpenUpdate = (item) => {
    setDeleteId(item.id);
    setOpenUpdateHandle(true);
  };
  const handleCloseUpdate = () => {
    setData({
      lastName: null,
      mobile: null,
      city: null,
      state: null,
    });
    setOpenUpdateHandle(false);
  };

  const [data, setData] = useState({
    lastName: null,
    mobile: null,
    city: null,
    state: null,
  });
  const updateAddress = (addressId, event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const responeData = {
      name: data.get("name"),
      mobile: data.get("mobile"),

      description: data.get("desc"),
      state: data.get("state") && "Mặc định",
    };
    setOpenUpdateHandle(false);
    dispath(
      updateAddressByUser({ addressId: addressId, responeData: responeData })
    );
    setIsLoading(true);
  };

  const changeAddressDefault = (addressId) => {
    setIsLoading(true);
    dispath(updateAddressDefault(addressId));
  };

  useEffect(() => {
    dispath(getAddressByUser());
  }, [dispath]);

  useEffect(() => {
    if (isLoading) {
      dispath(getAddressByUser())
        .then(() => {
          setIsLoading(false);
        })
        .catch(() => {
          setIsLoading(false);
        });
    }
  }, [isLoading, dispath]);

  const [state, setState] = useState(false);
  return (
    <div className="address">
      <div className="container">
        <div className="address-head">
          <h2 style={{ fontSize: "24px", fontWeight: "500" }}>
            Địa chỉ của tôi
          </h2>
          <Button
            onClick={handleOpen}
            variant="contained"
            color="error"
            style={{ paddingTop: "10px" }}
          >
            + Thêm địa chỉ
          </Button>
        </div>
        <hr></hr>
        <div className="address-content">
          {address && address.address ? (
            address.address.map((item) => (
              <div className="address-content-card">
                <div className="address-content-card-info">
                  <p>
                    <span>{item.name}</span> | {item.mobile}
                  </p>
                  <p>{item.city}</p>
                  {item.state && (
                    <Typography
                      component={"span"}
                      sx={{
                        border: "1px solid red",
                        padding: "0.5rem",
                        fontSize: "1.3rem",
                        color: "red",
                      }}
                      className="address-content-card-default"
                    >
                      Mặc định
                    </Typography>
                  )}
                </div>

                <div className="address-content-card-settings">
                  <Button variant="text" onClick={() => handleOpenUpdate(item)}>
                    Cập nhật
                  </Button>
                  <Modal
                    open={deleteId == item.id ? openUpdateHandle : false}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <h2
                        style={{
                          fontSize: "24px",
                          fontWeight: "500",
                          textAlign: "center",
                          marginBottom: "20px",
                        }}
                      >
                        Cập nhật địa chỉ
                      </h2>

                      <form
                        method="POST"
                        onSubmit={(event) => updateAddress(item.id, event)}
                      >
                        <Grid container spacing={2}>
                          <Grid item xs={12}>
                            <TextField
                              id="name"
                              label="Họ tên"
                              name="name"
                              fullWidth
                              value={
                                data.lastName != null
                                  ? data.lastName
                                  : item.lastName
                              }
                              onChange={(e) =>
                                setData({ lastName: e.target.value })
                              }
                              InputProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <PersonIcon fontSize="large" />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                              }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="mobile"
                              label="Số điện thoại"
                              name="mobile"
                              fullWidth
                              InputProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <LocalPhoneIcon fontSize="large" />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                              }}
                            ></TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="city"
                              label="Địa chỉ cụ thể"
                              name="city"
                              value={item.city}
                              fullWidth
                              InputProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                                endAdornment: (
                                  <InputAdornment position="end">
                                    <HomeIcon fontSize="large" />
                                  </InputAdornment>
                                ),
                              }}
                              InputLabelProps={{
                                sx: {
                                  fontSize: "16px",
                                },
                              }}
                            ></TextField>
                          </Grid>
                          {/* <Grid item xs={12} style={{marginLeft: "15px"}}>
>>>>>>> feature/new-teelab
                            <FormControlLabel
                              control={
                                <Checkbox
                                  value={state}
                                  checked={state}
                                  name="state"
                                  onClick={() => setState(!state)}
                                  fullWidth
                                ></Checkbox>
                              }
                            ></FormControlLabel>
                            <label style={{fontSize: "14px", marginLeft: "-18px"}}>Đặt làm mặc định</label>
                          </Grid> */}
                        </Grid>
                        <div
                          className="d-flex justify-content-end"
                          style={{ gap: "5px", marginTop: "15px" }}
                        >
                          <Button
                            variant="outlined"
                            color="error"
                            onClick={handleCloseUpdate}
                            style={{ paddingTop: "10px", fontSize: "14px" }}
                          >
                            Hủy
                          </Button>
                          <Button
                            type="submit"
                            color="error"
                            variant="contained"
                            style={{ paddingTop: "10px", fontSize: "14px" }}
                          >
                            Hoàn thành
                          </Button>
                        </div>
                      </form>
                    </Box>
                  </Modal>
                  {!item.state && (
                    <Button
                      onClick={() => handleOpenDelete(item.id)}
                      variant="text"
                    >
                      Xóa
                    </Button>
                  )}

                  <br></br>
                  <Button
                    variant="outlined"
                    onClick={() => changeAddressDefault(item.id)}
                    color="error"
                    style={{ paddingTop: "8px" }}
                  >
                    Thiết lập mặc định
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div>Chưa có địa chỉ</div>
          )}
        </div>

        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <FormAddress
            address
            handleClose={handleClose}
            title={"Thêm mới địa chỉ"}
            style
          ></FormAddress>
        </Modal>

        <Modal
          open={openDeleteHandle}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles}>
            <Typography id="modal-modal-title" style={{ fontSize: "16px" }}>
              Bạn có chắc chắn muốn xóa địa chỉ này?
            </Typography>
            <div
              className="d-flex justify-content-end"
              style={{ gap: "5px", marginTop: "10px" }}
            >
              <Button
                variant="outlined"
                color="error"
                onClick={handleCloseDelete}
                style={{ fontSize: "14px", marginTop: "10px" }}
              >
                Hủy
              </Button>
              <Button
                variant="contained"
                color="error"
                onClick={() => deleteAddress(deleteId)}
                style={{ fontSize: "14px", marginTop: "10px" }}
              >
                Xóa
              </Button>
            </div>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Address;
