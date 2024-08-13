import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
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
const Address = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const { auth, address } = useSelector((store) => store);
  const dispath = useDispatch();
  const [isLoading, setIsLoading] = useState(false);

  // create address
  const addAddressHandle = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const responeData = {
      name: data.get("name"),
      mobile: data.get("mobile"),
      city: data.get("city"),
      state: data.get("state") == "true" ? "Mặc định" : "",
    };
    console.log(responeData)
    dispath(addAddress(responeData));
    handleClose();
  };

  // delete address
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

  // update address
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
    setIsLoading(true)
  };

  const changeAddressDefault = (addressId) => {
    setIsLoading(true);
    dispath(updateAddressDefault(addressId));
  };

  useEffect(() => {
    // Tải danh sách địa chỉ khi component được khởi tạo
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
          <h2>Địa chỉ của tôi</h2>
          <Button onClick={handleOpen} variant="contained" color="error">
            + Thêm địa chỉ
          </Button>
        </div>
        <hr></hr>
        <div className="address-content">
          <h3>Địa chỉ</h3>
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
                        color: "red"
                      }}
                      className="address-content-card-default"
                    >
                      Mặc định
                    </Typography>
                  )}
                </div>

                <div className="address-content-card-settings">
                  <Button
                    variant="text"
                    onClick={() => handleOpenUpdate(item)}
                  >
                    Cập nhật
                  </Button>
                  <Modal
                    open={deleteId == item.id ? openUpdateHandle : false}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                  >
                    <Box sx={style}>
                      <h4>Địa chỉ mới</h4>
                      <form
                        method="POST"
                        onSubmit={(event) => updateAddress(item.id, event)}
                      >
                        <Grid container spacing={1}>
                          <Grid item xs={6}>
                            <TextField
                              id="name"
                              label="Họ tên"
                              name="name"
                              value={
                                data.lastName != null
                                  ? data.lastName
                                  : item.lastName
                              }
                              onChange={(e) =>
                                setData({ lastName: e.target.value })
                              }
                            ></TextField>
                          </Grid>
                          <Grid item xs={6}>
                            <TextField
                              id="mobile"
                              label="Số điện thoại"
                              name="mobile"
                            ></TextField>
                          </Grid>
                          <Grid item xs={12}>
                            <TextField
                              id="city"
                              label="Địa chỉ cụ thể"
                              name="city"
                              value={item.city}
                              fullWidth
                            ></TextField>
                          </Grid>
                          <Grid item xs={6}>
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
                              label="Đặt làm mặc định"
                            ></FormControlLabel>
                          </Grid>
                        </Grid>
                        <Button variant="contained" onClick={handleCloseUpdate}>
                          Trở lại
                        </Button>
                        <Button type="submit" variant="contained">
                          Hoàn thành
                        </Button>
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
          {/* <Box sx={style}>
            <h4>Địa chỉ mới</h4>
            <form method="POST" onSubmit={addAddressHandle}>
              <Grid container spacing={1}>
                <Grid item xs={6}>
                  <TextField id="name" label="Họ tên" name="name"></TextField>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    id="mobile"
                    label="Số điện thoại"
                    name="mobile"
                  ></TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    id="city"
                    label="Địa chỉ cụ thể"
                    name="city"
                    fullWidth
                  ></TextField>
                </Grid>

                <Grid item xs={6}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        value={state}
                        name="state"
                        onChange={() => setState(!state)}
                        fullWidth
                      ></Checkbox>
                    }
                    label="Đặt làm mặc định"
                  ></FormControlLabel>
                </Grid>
              </Grid>
              <Button variant="contained" onClick={handleClose}>
                Trở lại
              </Button>
              <Button type="submit" variant="contained">
                Hoàn thành
              </Button>
            </form>
          </Box> */}
          <FormAddress address title={"Sửa địa chỉ"}></FormAddress>
        </Modal>

        <Modal
          open={openDeleteHandle}
          onClose={handleCloseDelete}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Bạn có chắc chắn muốn xóa địa chỉ này ? {deleteId}
            </Typography>
            <Button>Trở lại</Button>
            <Button variant="contained" onClick={() => deleteAddress(deleteId)}>
              Xóa
            </Button>
          </Box>
        </Modal>
      </div>
    </div>
  );
};

export default Address;
