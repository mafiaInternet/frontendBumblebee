import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Box } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';

const heads = ["Đơn hàng", "Ngày", "Tổng đơn hàng", "Trạng thái", " "];

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    width: "25%",
    color: theme.palette.common.black,
    fontSize: 15,
  },
  [`&.${tableCellClasses.body}`]: {
    width: "25%",
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

const Dashboard = () => {
  const { auth, order } = useSelector((store) => store);

  console.log(order);

  return (
    <div className="dashboard">
      <div className="container">
        <h2 style={{fontSize: "24px", fontWeight: "500"}}>BẢNG ĐIỀU KHIỂN</h2>
        <hr style={{marginBottom: "0px"}}/>
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
            <div className="dashboard--content--orders" style={{marginTop: "60px"}}>
              <h2 style={{fontSize: "24px", fontWeight: "500"}}>NHỮNG ĐƠN HÀNG GẦN ĐÂY</h2>
              <hr></hr>
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      {heads.map((head) => (
                        <StyledTableCell align="left" key={head}>{head}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.orders && order.orders.length > 0 ? (
                      order.orders.map((order, index) => (
                        <StyledTableRow key={index}>
                          <StyledTableCell align="left">{order.id}</StyledTableCell>
                          <StyledTableCell align="left">{order.createAt ? moment(order.createAt).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}</StyledTableCell>
                          <StyledTableCell align="left">{order.totalPrice}</StyledTableCell>
                          <StyledTableCell align="left">{order.orderStatus}</StyledTableCell>
                          <StyledTableCell align="left">
                            <Link to={`/account/order/${order.id}`}>
                              <VisibilityIcon style={{ fontSize: "20px", marginBottom: "5px" }} />
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    ) : (
                      <StyledTableRow>
                        <StyledTableCell colSpan={heads.length} align="center">
                          <div style={{ color: "silver", fontSize: "20px", fontWeight: "500", marginTop: "20px" }}>
                            <DescriptionIcon style={{ fontSize: "24px", marginBottom: "5px" }} /> Chưa có đơn hàng
                          </div>
                        </StyledTableCell>
                      </StyledTableRow>
                    )}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
