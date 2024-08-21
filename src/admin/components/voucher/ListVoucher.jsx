import { handleGetVouchers } from "../../../state/voucher/Action";
import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { useDispatch, useSelector } from "react-redux";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import moment from 'moment';

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
  "Tên",
  "Mô tả",
  "Thể loại",
  "Khuyến mại",
  "Điều kiện",
  "Số lượng",
  "Dành cho",
  "Ngày tạo",
  "Ngày kết thúc",
];

const ListVoucher = () => {
  const dispatch = useDispatch();
  const { voucher } = useSelector((store) => store);
  console.log(voucher);
  React.useEffect(() => {
    dispatch(handleGetVouchers());
  }, [dispatch]);
  return (
    voucher.vouchers && (
      <div className="listVoucher" style={{padding: "10px 30px"}}>
        <h2 className="admin--home--title" style={{paddingLeft: "0px"}}>Danh sách voucher</h2>
          <div className="listVoucher--content">
          <div className="layer" style={{marginBottom: "10px"}}></div>
            <Link to="/admin/voucher/create">
              <Button 
                variant="contained" 
                className="listProduct--content--add"
                style={{padding: "10px 15px", fontSize: "12px", marginTop: "20px"}}>
                Thêm voucher +
              </Button>
            </Link>
            <TableContainer>
              <Table sx={{ minWidth: 700 }} aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {tableHeads.map((item) => (
                      <StyledTableCell align="left">{item}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {voucher.vouchers &&
                    voucher.vouchers.map((item, index) => (
                      <StyledTableRow key={index}>
                        <StyledTableCell align="left">{index}</StyledTableCell>
                        <StyledTableCell align="left">
                          {item.name}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.description}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.type}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.discountedPrice
                            ? item.discountedPrice + "VND"
                            : item.discountedPersent + "%"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.totalPriceOrdered
                            ? "Đơn hàng " + item.totalPriceOrdered + " VNĐ"
                            : item.totalOrderedCustomer
                            ? "Tài khoản đã mua " +
                              item.totalOrderedCustomer +
                              " VNĐ"
                            : item.product}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.quantity}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.type === "customer"
                            ? "Khách hàng thân thiết"
                            : "Toàn bộ khách hàng"}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.start ? moment(item.start).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                        </StyledTableCell>
                        <StyledTableCell align="left">
                          {item.end ? moment(item.end).format('DD/MM/YYYY HH:mm:ss') : 'N/A'}
                        </StyledTableCell>
                      </StyledTableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>
        </div>
    )
  );
};

export default ListVoucher;
