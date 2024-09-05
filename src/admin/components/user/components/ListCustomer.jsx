import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { styled } from "@mui/material/styles";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import moment from "moment";
import { Box, Button, Modal, TextField, Typography } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import Switch from "@mui/material/Switch";
import AddCustomer from "./AddCustomer";
import { Link } from "react-router-dom";
import {
  deleteCustomerById,
  findUserByEmail,
  getCustomers,
  getUserById,
} from "../../../../state/customer/Actions";

const label = { inputProps: { "aria-label": "Switch demo" } };
const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.black,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const tableHeads = [
  "STT",
  "Tên người dùng",
  "Email",
  "Số điện thoại",
  "Ngày tạo",
  "Khóa",
  "Ủy quyền",
  "Thao tác",
];

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 660,
  height: 660,
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
  width: 390,
  height: 150,
  bgcolor: "background.paper",
  border: "1px solid silver",
  boxShadow: 24,
  p: 4,
  borderRadius: "10px",
};

const ListCustomers = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store);
  const [select, setSelect] = useState();
  const [openDeleteHandle, setOpenDeleteHandle] = React.useState(false);

  const handleOpenDelete = (userId) => {
    setOpenDeleteHandle(true);
    setSelect(userId);
  };

  const handleCloseDelete = () => setOpenDeleteHandle(false);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [users, setUsers] = useState([]);

  const handleFilterUser = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    if (data.get("email") != "") {
      dispatch(findUserByEmail(data.get("email")));
      setUsers([customer.customer]);
      console.log(users);
    } else {
      setUsers(customer.customers);
    }
  };

  useEffect(() => {
    if (!customer.customers || customer.customers.length === 0) {
      dispatch(getCustomers());
    } else {
      setUsers(customer.customers);
    }
  }, [dispatch, customer.customers]);

  return (
    <div className="customers">
      <h2 className="admin--home--title">Quản Lý Người Dùng</h2>

      <div className="customers--content">
        <Button
          className="customers--content--add"
          variant="contained"
          onClick={handleOpen}
          style={{ padding: "10px 15px", fontSize: "12px" }}
        >
          Thêm người dùng mới +
        </Button>
        <form className="customers--content--form" onSubmit={handleFilterUser}>
          <TextField label="Email" name="email"></TextField>
          <Button variant="contained" type="submit">
            Lọc
          </Button>
        </form>

        <TableContainer>
          <Table
            className="customers--table"
            sx={{ width: "100%" }}
            aria-label="customized table"
          >
            <TableHead className="customers--table--head">
              <TableRow>
                {tableHeads.map((tableHead) => (
                  <StyledTableCell
                    align={tableHead === "Khóa" ? "center" : "left"}
                  >
                    {tableHead}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="customers--table--body">
              {users.map((item, index) => (
                <StyledTableRow key={item.id}>
                  <StyledTableCell align="left">{index}</StyledTableCell>
                  <StyledTableCell align="left">{item.name}</StyledTableCell>
                  <StyledTableCell align="left">{item.email}</StyledTableCell>

                  <StyledTableCell align="left">{item.mobile}</StyledTableCell>

                  <StyledTableCell align="left">
                    {item.createAt
                      ? moment(item.createAt).format("DD/MM/YYYY HH:mm:ss")
                      : "N/A"}
                  </StyledTableCell>
                  <StyledTableCell align="center">
                    <Switch {...label} />
                  </StyledTableCell>
                  <StyledTableCell align="left">{item.role}</StyledTableCell>
                  <StyledTableCell align="left">
                    <Link
                      to="/admin/user/edit"
                      onClick={() => dispatch(getUserById(item.id))}
                    >
                      <EditNoteSharpIcon
                        color="primary"
                        sx={{ fontSize: "32px" }}
                      ></EditNoteSharpIcon>
                    </Link>
                    <DeleteIcon
                      color="error"
                      onClick={handleOpenDelete}
                      sx={{ fontSize: "24px" }}
                    ></DeleteIcon>
                  </StyledTableCell>
                </StyledTableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

      <Modal
        open={openDeleteHandle}
        onClose={handleCloseDelete}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styles}>
          <Typography id="modal-modal-title" style={{ fontSize: "16px" }}>
            Bạn chắc chắn muốn xóa người dùng này ?
          </Typography>
          <div
            className="d-flex justify-content-end"
            style={{ gap: "5px", marginTop: "10px" }}
          >
            <Button
              style={{ fontSize: "14px", marginTop: "10px" }}
              color="error"
              variant="outlined"
              onClick={handleCloseDelete}
            >
              Hủy
            </Button>
            <Button
              style={{ fontSize: "14px", marginTop: "10px" }}
              color="error"
              variant="contained"
              onClick={() => {
                dispatch(deleteCustomerById(select));
              }}
            >
              Xóa
            </Button>
          </div>
        </Box>
      </Modal>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <AddCustomer></AddCustomer>
        </Box>
      </Modal>
    </div>
  );
};

export default ListCustomers;
