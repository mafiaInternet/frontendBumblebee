// Address.jsx
import { Box, Button, Typography, Modal } from "@mui/material";
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
  width: 750,
  height: 580,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px"
};

const style = {
  ...modalStyles,
  height: 130,
  width: 390
}

const Address = () => {
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [openDeleteHandle, setOpenDeleteHandle] = useState(false);
  const [editAddress, setEditAddress] = useState(null);
  const [deleteId, setDeleteId] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();
  const { address } = useSelector((store) => store);

  const handleCloseDelete = () => setOpenDeleteHandle(false);

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

  const handleOpenEdit = (address) => {
    setEditAddress(address);
    setOpenEdit(true);
  };

  const handleOpenDelete = (id) => {
    console.log(id)
    setDeleteId(id);
    setOpenDeleteHandle(true);
  };

  const deleteAddress = (addressId) => {
    setOpenDeleteHandle(false);
    dispatch(deleteAddressByUser(addressId));
  };

  const changeAddressDefault = (addressId) => {
    setIsLoading(true);
    dispatch(updateAddressDefault(addressId));
  };

  return (
    <div className="address">
      <div className="container">
        <div className="address-head">
          <Typography style={{ fontSize: "24px", fontWeight: "500" }}>
            ĐỊA CHỈ CỦA TÔI
          </Typography>
          <Button onClick={() => setOpenCreate(true)} variant="contained" color="error" style={{ padding: "10px 20px 7px 20px", fontSize: "12px" }}>
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
                      <span style={{ fontSize: "16px" }}>{item.name}</span> | {item.mobile}
                    </Typography>
                    <Typography variant="body2">{item.province} - {item.district} - {item.ward}</Typography>
                    <Typography variant="body2">Địa chỉ cụ thể: {item.description}</Typography>
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
                    <Button variant="contained" onClick={() => handleOpenEdit(item)} style={{ marginRight: "10px", paddingTop: "9px" }}>
                      Cập nhật
                    </Button>
                    <Button variant="contained" color="error" onClick={() => handleOpenDelete(item.id)} style={{ paddingTop: "9px" }}>
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

        <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
          <Box sx={modalStyles}>
            <FormAddress
              type="create"
              handleClose={() => setOpenCreate(false)}
              setOpenEdit={setOpenEdit}
              title='Thêm mới địa chỉ'
              address={{}} // Passing empty address for creation
            />
          </Box>
        </Modal>

        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <Box sx={modalStyles}>
            <FormAddress
              type="update"
              handleClose={() => setOpenEdit(false)}
              setOpenEdit={setOpenEdit}
              title='Chỉnh sửa địa chỉ'
              address={editAddress} // Passing the address to be edited
            />
          </Box>
        </Modal>

        <Modal open={openDeleteHandle} onClose={handleCloseDelete}>
          <Box sx={style}>
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