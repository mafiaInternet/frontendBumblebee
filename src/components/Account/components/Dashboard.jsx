import {
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Button,
  Grid,
} from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const heads = ["Đơn hàng", "Ngày", "Tổng đơn hàng", "Trạng thái", ""];

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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));
const Dashboard = () => {
  const { auth, order } = useSelector((store) => store);

  return (
    <div className="dashboard">
      <div className="container">
        <h2>Bảng điều khiển</h2>
        <div className="dashboard--content">
          <div className="dashboard--content--point">
            <p>
              <span>Điểm tích lũy: </span>
              <strong>11k</strong>
            </p>
           
          </div>
          <Box
              sx={{
                position: "relative",
                width: "70%",
                margin: "3rem auto",
                height: "0.5rem",
                border: "1px solid silver",
                background: `linear-gradient(to right, orange ${
                  (100 / 150) * 100
                }%, white ${(100 / 150) * 100}%)`,
              }}
            >
              <Box
                sx={{
                  position: "absolute",
                  left: "0px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "4rem",
                  height: "4rem",
                  lineHeight: "3.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  border: "2px solid silver",
                  borderRadius: "50%",
                }}
              >
                0K
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  left: "66.66%",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "4rem",
                  height: "4rem",
                  lineHeight: "3.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  border: "2px solid silver",
                  borderRadius: "50%",
                }}
              >
                100K
              </Box>
              <Box
                sx={{
                  position: "absolute",
                  right: "0px",
                  top: "50%",
                  transform: "translateY(-50%)",
                  width: "4rem",
                  height: "4rem",
                  lineHeight: "3.6rem",
                  textAlign: "center",
                  fontWeight: "bold",
                  fontSize: "1.5rem",
                  backgroundColor: "white",
                  border: "2px solid silver",
                  borderRadius: "50%",
                }}
              >
                150K
              </Box>
            </Box>
            <div className="dashboard--content--orders">
              <div className="dashboard--content--orders--title">
                <h3>NHỮNG ĐƠN HÀNG GẦN ĐÂY</h3>
                <Link>Xem tất cả</Link>
              </div>
              <hr></hr>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {heads.map((head) => (
                        <StyledTableCell align="left">{head}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order.orders &&
                      order.orders.map((order, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">
                            {order.id}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {order.createAt}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {order.totalDiscountedPrice}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            {order.orderStatus}
                          </StyledTableCell>
                          <StyledTableCell align="left">
                            <Link to={"/order/order-details/"}>
                              Xem chi tiết
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
            <div className="dashboard--content--address">
              <h3>SỔ ĐỊA CHỈ</h3>
              <Grid container spacing={3}>
              {auth.user.address.map((item) => (
                <Grid item xs={6}>
                <p>{item.lastName}</p>
                <p>{item.city}</p>
                <p>Phường Văn Quán, Quận Hà Đông, Hà Nội, Việt Nam</p>
                <p>Tel: {item.mobile}</p>
                <div className="dashboard--content--address--act">
                <Button variant="contained" color="error">Sửa địa chỉ</Button>
                <Button variant="outlined" color="error">Xóa địa chỉ</Button>

                </div>
              </Grid>
              ))}

              </Grid>
              
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
