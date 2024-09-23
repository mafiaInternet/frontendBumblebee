import { styled, Table, TableBody, TableCell, tableCellClasses, TableContainer, TableHead, TableRow, Box, Card, CardContent, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import DescriptionIcon from '@mui/icons-material/Description';
import VisibilityIcon from '@mui/icons-material/Visibility';
import moment from 'moment';
import { Star } from '@mui/icons-material';

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

const Dashboard = ({points = 150}) => {
  const { auth, order } = useSelector((store) => store);

  return (
    <div className="dashboard">
      <div className="container">
        <div className="dashboard--content">
        <Card sx={{ maxWidth: 300, margin: 'auto', mt: 2 }}>
          <CardContent sx={{backgroundColor: "#EEEEEE"}}>
            <Typography variant="h4" component="div" gutterBottom>
              Điểm tích lũy:
            </Typography>
            <Box display="flex" alignItems="center" justifyContent="center">
              <Star sx={{ color: 'gold', mr: 1, fontSize: 30 }} />
              <Typography variant="h3">{auth.user.fpoint} Điểm</Typography>
            </Box>
          </CardContent>
        </Card>
            <div className="dashboard--content--orders" style={{marginTop: "30px"}}>
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
