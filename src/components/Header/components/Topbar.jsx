import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Link, useNavigate } from "react-router-dom";
import Auth from "../../../customer/Auth.jsx";
import Navigation from "./Navigation.jsx";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Typography from '@mui/material/Typography';

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: "3px",
  backgroundColor: "white",
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "300px",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  right: "0",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backgroundColor: "#545457",
  borderRadius: "3px",

}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "#545457",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    width: "100%",
    paddingLeft: "10px",
  },
}));

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Topbar = (props) => {
  const { cart } = useSelector(store => store)


  const navigate = useNavigate()
  const [state, setState] = React.useState("")

  const handleSearch = () => {
    // navigate(`/search?query=${state}`)   
  }
  return (
    <div className="topbar" style={{width: "100%"}}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#F5F5F5",
            boxShadow: "none",
            borderRadius: "none",
          }}
        >
          <Toolbar sx={{ display: "flex", justifyContent: "space-between", padding: "12px 24px 12px 0px"}}>
            <Link to="/home" style={{textDecoration: "none"}}>
              <Typography variant="h2" sx={{ color: "#232323", fontWeight: "700"}}>
                  BUMBLEBEE 
              </Typography>
            </Link>
            <Box className="topbar-icons d-flex" style={{ gap: "15px" }}>
              <Search 
                sx={{
                  cursor: "pointer",
                  "@media (max-width: 800px)": {
                      width: "154px",
                    },
                  "@media (max-width: 640px)": {
                      display:"none",
                    },
                }} 
                onClick={handleSearch}
              >
                <SearchIconWrapper onClick={handleSearch}>
                  <SearchIcon onClick={handleSearch} style={{fontSize: "22px"}}/>
                </SearchIconWrapper>
                <StyledInputBase
                  sx={{ 
                    fontSize: "16px",
                    "@media (max-width: 800px)": {
                      width: "100px",
                    },
                  }}
                  placeholder="Tìm kiếm…"
                  onChange={(e) => setState(e.target.value)}
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
              <div className="topbar-icons-shoppingBag" style={{marginRight: "20px"}}>
                <Link to="/cart">
                  <StyledBadge badgeContent={cart.cart && cart.cart.totalItem || 0} color="secondary">
                    <ShoppingCartOutlinedIcon
                      sx={{ fontSize: "3rem", color: "black" }}
                    />
                  </StyledBadge>
                </Link>
              </div>
              {props.jwt ? <Navigation></Navigation> : <Auth></Auth>}
            </Box>
          </Toolbar>
        </AppBar>
      </Box>
    </div>
  );
};

export default Topbar;
