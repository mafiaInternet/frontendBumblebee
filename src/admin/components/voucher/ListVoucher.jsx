import { handleGetVouchers } from "../../../state/voucher/Action";
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));



  const tableHeads = ["STT", "Tên", "Mô tả", "Thể loại", "Khuyến mại", "Điều kiện","Số lượng","Dành cho", "Ngày tạo", "Ngày kết thúc"]
const ListVoucher = () => {
  const dispatch = useDispatch();
  const { voucher } = useSelector((store) => store);
console.log(voucher)
  React.useEffect(() => {
    dispatch(handleGetVouchers());
  }, [dispatch]);
  return (
    voucher.vouchers && (
      <div className="listVoucher">
        <h2>Danh sách voucher</h2>
        <div className="container">
          <div className="listVoucher--content">
            <Button variant="contained" color="error">
              Thêm voucher +
            </Button>
            <TableContainer >
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
                {tableHeads.map((item) => (
                    <StyledTableCell align="left">{item}</StyledTableCell>
                ))}
          </TableRow>
        </TableHead>
        <TableBody>

             {voucher.vouchers && voucher.vouchers.map((item, index) => (
            <StyledTableRow key={index}>
                <StyledTableCell align="left">{index}</StyledTableCell>
                <StyledTableCell align="left">{item.name}</StyledTableCell>
                <StyledTableCell align="left">{item.description}</StyledTableCell>
                <StyledTableCell align="left">{item.type}</StyledTableCell>
                <StyledTableCell align="left">{item.discountedPrice ? item.discountedPrice + "VND" : item.discountedPersent + "%"}</StyledTableCell>

                <StyledTableCell align="left">{item.totalPriceOrdered ? "Đơn hàng " + item.totalPriceOrdered + " VNĐ" : item.totalOrderedCustomer ? "Tài khoản đã mua " + item.totalOrderedCustomer + " VNĐ" : item.product}</StyledTableCell>
                <StyledTableCell align="left">{item.quantity}</StyledTableCell>
                <StyledTableCell align="left">{item.type === "customer" ? "Khách hàng thân thiết" : "Toàn bộ khách hàng"}</StyledTableCell>
                <StyledTableCell align="left">{item.start}</StyledTableCell>
                <StyledTableCell align="left">{item.end}</StyledTableCell>
            </StyledTableRow>
             ))}

        </TableBody>
      </Table>
    </TableContainer>
          </div>
        </div>
      </div>
    )
  );
};

export default ListVoucher;
