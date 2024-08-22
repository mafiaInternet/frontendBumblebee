import { Box, Button, Typography, Modal, Grid } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addAddress, deleteAddressByUser, getAddressByUser, updateAddressByUser, updateAddressDefault } from "../../../state/address/Action";
import FormAddress from "../../../layout/FormAddress";
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart';

const modalStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 380,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const Address = () => {
  const [open, setOpen] = useState(false);
  const [openUpdateHandle, setOpenUpdateHandle] = useState(false);
  const [openDeleteHandle, setOpenDeleteHandle] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [data, setData] = useState({ lastName: '', mobile: '', city: '', state: '' });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { auth, address } = useSelector((store) => store);

  useEffect(() => {
    dispatch(getAddressByUser());
  }, [dispatch]);

  useEffect(() => {
    if (isLoading) {
      dispatch(getAddressByUser())
        .then(() => setIsLoading(false))
        .catch(() => setIsLoading(false));
    }
  }, [isLoading, dispatch]);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const addAddressHandle = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const responeData = {
      name: data.get("name"),
      mobile: data.get("mobile"),
      city: data.get("city"),
      state: data.get("state") === "true" ? "Mặc định" : "",
    };
    dispatch(addAddress(responeData));
    handleClose();
  };

  const handleOpenDelete = (id) => {
    setDeleteId(id);
    setOpenDeleteHandle(true);
  };

  const handleCloseDelete = () => setOpenDeleteHandle(false);

  const deleteAddress = (addressId) => {
    setOpenDeleteHandle(false);
    dispatch(deleteAddressByUser(addressId));
  };

  const handleOpenUpdate = (item) => {
    setData({
      lastName: item.name,
      mobile: item.mobile,
      city: item.city,
      state: item.state || '',
    });
    setDeleteId(item.id);
    setOpenUpdateHandle(true);
  };

  const handleCloseUpdate = () => {
    setData({ lastName: '', mobile: '', city: '', state: '' });
    setOpenUpdateHandle(false);
  };

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
    dispatch(updateAddressByUser({ addressId: addressId, responeData: responeData }));
    setIsLoading(true);
  };

  const changeAddressDefault = (addressId) => {
    setIsLoading(true);
    dispatch(updateAddressDefault(addressId));
  };

  return (
    <div className="address">
      <div className="container">
        <div className="address-head">
          <Typography style={{fontSize: "24px", fontWeight: "500"}}>
            ĐỊA CHỈ CỦA TÔI
          </Typography>
          <Button onClick={handleOpen} variant="contained" color="error" style={{ padding: "10px 20px 7px 20px", fontSize: "12px" }}>
            + Thêm địa chỉ
          </Button>
        </div>
        <hr />
        <div className="address-content">
          {address && address.address ? (
            address.address.length > 0 ? (
              address.address.map((item) => (
                <div key={item.id} className="address-content-card">
                  <div className="address-content-card-info">
                    <Typography variant="body1">
                      <span style={{fontSize: "16px"}}>{item.name}</span> | {item.mobile}
                    </Typography>
                    <Typography variant="body2">{item.city}</Typography>
                    {item.state && (
                      <Typography
                        component="span"
                        style={{
                          display: "block",
                          border: "1px solid red",
                          padding: "6px 20px",
                          fontSize: "14px",
                          color: "red",
                          borderRadius: "8px",
                          width: "100px",
                          marginTop: "5px"
                        }}
                      >
                        Mặc định
                      </Typography>
                    )}
                  </div>
                  <div className="address-content-card-settings">
                    <Button variant="contained" onClick={handleOpen} style={{marginRight: "10px", paddingTop: "9px"}}>
                      Cập nhật
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenDelete(item.id)} style={{paddingTop: "9px"}}>
                      Xóa
                    </Button>
                    <br />
                    <Button
                      variant="text"
                      onClick={() => changeAddressDefault(item.id)}
                      sx={{ mt: 1, color: "black" }}
                    >
                      Thiết lập mặc định
                    </Button>
                  </div>
                </div>
              ))
            ) : (
              <Typography variant="body1" sx={{ color: 'silver', textAlign: 'center', mb: 4 }}>
                <RemoveShoppingCartIcon sx={{ fontSize: 25, mb: 1 }} /> Hết sản phẩm
              </Typography>
            )
          ) : (
            <Typography variant="body1" sx={{ color: 'silver', textAlign: 'center', mb: 4 }}>
              Loading...
            </Typography>
          )}
        </div>

        <Modal open={open} onClose={handleClose}>
          <Box sx={modalStyles}>
            <FormAddress
              address
              handleClose={handleClose}
              title="Thêm mới địa chỉ"
            />
          </Box>
        </Modal>

        <Modal open={openDeleteHandle} onClose={handleCloseDelete}>
          <Box sx={modalStyles}>
            <Typography variant="body1" sx={{ fontSize: 16 }}>
              Bạn có chắc chắn muốn xóa địa chỉ này?
            </Typography>
            <div className="d-flex justify-content-end" style={{ gap: '5px', marginTop: '10px' }}>
              <Button variant="outlined" color="error" onClick={handleCloseDelete} sx={{ fontSize: 14 }}>
                Hủy
              </Button>
              <Button variant="contained" color="error" onClick={() => deleteAddress(deleteId)} sx={{ fontSize: 14 }}>
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
