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
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';

const heads = ["Đơn hàng", "Ngày", "Tổng đơn hàng", "Trạng thái", "Hành động"];

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

  return (
    <div className="dashboard">
      <div className="container">
        <h2 style={{fontSize: "24px", fontWeight: "500"}}>Bảng điều khiển</h2>
        <hr></hr>
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
                        <StyledTableCell align="left">{head}</StyledTableCell>
                      ))}
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {order?.orders &&
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
                              <VisibilityIcon style={{fontSize: "20px", marginBottom: "5px"}}/>
                            </Link>
                          </StyledTableCell>
                        </StyledTableRow>
                      ))
                    }
                  </TableBody>
                </Table>
                {order === null ?
                  <div style={{color: "silver", fontSize: "20px", fontWeight: "500", marginTop: "20px", width: "200px"}}> 
                    <DescriptionIcon style={{fontSize: "24px", marginBottom: "5px"}}/> Chưa có đơn hàng
                  </div>
                :
                  <></>
                }
              </TableContainer>
            </div>
            <div className="dashboard--content--address" style={{marginTop: "60px"}}>
              <h2 style={{fontSize: "24px", fontWeight: "500"}}>SỔ ĐỊA CHỈ</h2>
              <hr></hr>
              <Grid container spacing={3}>
              {auth.user ? auth.user.address.map((item) => (
                <Grid item xs={6}>
                <p>{item.lastName}</p>
                <p>{item.city}</p>
                <p>Phường Văn Quán, Quận Hà Đông, Hà Nội, Việt Nam</p>
                <p>Tel: {item.mobile}</p>
                <div className="dashboard--content--address--act">
                <Button variant="contained" color="error" style={{paddingTop: "10px"}}>Sửa địa chỉ</Button>
                <Button variant="outlined" color="error" style={{paddingTop: "10px"}}>Xóa địa chỉ</Button>
                </div>
              </Grid>
              )) : (<Grid item xs={12}>Chưa có địa chỉ nào</Grid>)}

              </Grid>
              
              
            </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
