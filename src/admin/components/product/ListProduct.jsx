import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import { Button, MenuItem, Pagination, Select, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProductById,
  findProductFilter,
  getProducts,
  sortProductsHigh,
  sortProductsLow,
  sortProductsNew,
  sortProductsOld,
} from "../../../state/product/Action";
import { CheckBox } from "@mui/icons-material";
import moment from "moment";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { Link } from "react-router-dom";
import DeleteIcon from "@mui/icons-material/Delete";
import EditNoteSharpIcon from "@mui/icons-material/EditNoteSharp";
import { Price } from "../../../config/config";

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
  "",
  "Ngày tạo",
  "Tên sản phẩm",
  "Thể loại",
  "Giá gốc",
  "Giảm giá",
  "Quantity",
  "Status",
  "Thao tác",
];

const ListProduct = () => {
  const dispatch = useDispatch();
  const { products } = useSelector((store) => store);
  const [sort, setSort] = React.useState("Mới nhất");

  const handleDelete = (productId) => {
    dispatch(deleteProductById(productId));
  };

  const [page, setPage] = React.useState(0);

  const handlePagination = (event) => {
    const pageNumber = event.target.innerText;
    console.log(pageNumber);
    if (pageNumber > 0) {
      setPage(event.target.innerText - 1);
    }
    console.log(page);
  };

  const handleSortProducts = (event) => {
    const sortType = event.target.value;
    setSort(event.target.value);
    const data = Object.values(products.products);

    if (sortType == "Từ thấp đến cao") {
      dispatch(sortProductsLow(data));
    } else if (sortType === "Từ cao đến thấp") {
      console.log("abc");
      dispatch(sortProductsHigh(data));
    } else if (sortType === "Cũ nhất") {
      dispatch(sortProductsOld(data));
    } else if (sortType === "Mới nhất") {
      dispatch(sortProductsNew(data));
    }
  };

  const handleFindProducts = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    dispatch(
      findProductFilter({
        title: data.get("title") || "",
        category: data.get("category") || "",
      })
    );
  };

  React.useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  return (
    <div className="listProduct">
      <h2 className="admin--home--title">List Product</h2>
      <div className="listProduct--content">
        <div className="layer" style={{ marginBottom: "10px" }}></div>
        <Link to="/admin/product/create">
          <Button
            className="listProduct--content--add"
            variant="contained"
            style={{
              padding: "10px 15px",
              fontSize: "12px",
              marginTop: "20px",
            }}
          >
            Thêm sản phẩm mới +
          </Button>
        </Link>
        <div className="listProduct--content--filter">
          <div className="listProduct--content--filter--sort">
            <label>Sắp xếp theo</label>
            <Select value={sort} onChange={handleSortProducts}>
              <MenuItem value={"Mới nhất"}>Mới nhất</MenuItem>
              <MenuItem value={"Cũ nhất"}>Cũ nhất</MenuItem>
              <MenuItem value={"Từ thấp đến cao"}>Từ thấp đến cao</MenuItem>
              <MenuItem value={"Từ cao đến thấp"}>Từ cao đến thấp</MenuItem>
            </Select>
          </div>

          <form
            className="listProduct--content--filter--find"
            method="POST"
            onSubmit={handleFindProducts}
          >
            <TextField label="Tên sản phẩm" name="title"></TextField>
            <TextField label="Thể loại" name="category"></TextField>
            <Button variant="contained" type="submit">
              Lọc
            </Button>
          </form>
        </div>
        <TableContainer>
          <Table sx={{ width: "100%" }}>
            <TableHead className="table-head">
              <TableRow>
                {tableHeads.map((tableHead) => (
                  <StyledTableCell>{tableHead}</StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody className="table-body">
              {products &&
                products.products &&
                products.products
                  .slice(page * 6, page * 6 + 6)
                  .map((product) => (
                    <StyledTableRow key={product.id}>
                      <StyledTableCell align="center">
                        <CheckBox></CheckBox>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.createAt
                          ? moment(product.createAt).format(
                              "DD/MM/YYYY HH:mm:ss"
                            )
                          : "N/A"}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.title}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.category && product.category.name}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Price price={product.price}></Price>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.discountPersent}%
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.totalQuantity}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        {product.totalQuantity > 0 ? (
                          <CheckIcon color="success"></CheckIcon>
                        ) : (
                          <CloseIcon color="error"></CloseIcon>
                        )}
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Link to={`/admin/product/${product.id}/edit`}>
                          <EditNoteSharpIcon
                            color="primary"
                            sx={{ fontSize: "28px" }}
                          ></EditNoteSharpIcon>
                        </Link>
                        <DeleteIcon
                          sx={{ cursor: "pointer", fontSize: "19px" }}
                          color="error"
                          onClick={() => handleDelete(product.id)}
                        ></DeleteIcon>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Pagination
          sx={{ float: "right" }}
          count={Math.ceil(products.products.length / 6)}
          onClick={(e) => handlePagination(e)}
          color="secondary"
        />
      </div>
    </div>
  );
};

export default ListProduct;
