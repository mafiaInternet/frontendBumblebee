import * as React from "react";
import { styled } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import Badge from "@mui/material/Badge";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Auth from "../../../customer/Auth.jsx";
import Navigation from "./Navigation.jsx";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import Typography from "@mui/material/Typography";
import { Button, Modal } from "@mui/material";
import { search } from "../../../config/characterInputConfig.jsx";
import { useState } from "react";
import AuthLogin from "../../../customer/auth/AuthLogin.jsx";
import AuthRegister from "../../../customer/auth/AuthRegister.jsx";

const style = {
  position: "absolute",
  display: "flex",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "auto",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const StyledBadge = styled(Badge)(({ theme }) => ({
  "& .MuiBadge-badge": {
    right: 0,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}));

const Topbar = (props) => {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [state, setState] = useState("");
  const [isAuthenticated, setIsAuththenticated] = useState(false);
  const handleCloseAuthClose = () => setIsAuththenticated(false);
  const handleSearch = () => {
    const check = search(state);
    if (check) {
      if (location.search != "") {
        navigate(
          `/product/search?category=${query.get("category")}&title=${state}`
        );
      } else {
        navigate(`/product/search?category=all&title=${state}`);
      }
    }
  };

  const handleClickCart = () => {
    if (props.jwt) {
      navigate("/cart");
    } else {
      setIsAuththenticated(true);
    }
  };

  return (
    <div className="topbar" style={{ width: "100%" }}>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar
          position="static"
          sx={{
            backgroundColor: "#F5F5F5",
            boxShadow: "none",
            borderRadius: "none",
          }}
        >
          <Toolbar
            sx={{
              display: "flex",
              justifyContent: "space-between",
           
            }}
          >
            <Link to="/home" style={{ textDecoration: "none" }}>
              <Typography
                variant="h2"
                sx={{ color: "#232323", fontWeight: "700" }}
              >
                BUMBLEBEE
              </Typography>
            </Link>
            <Box className="topbar-icons d-flex" style={{ gap: "15px" }}>
              <Box
                className="topbar-icons-search"
                sx={{
                  "@media (max-width: 900px)": {
                    width: "154px",
                    display: "none"
                  }
                }}
              >
                <input
                  type="text"
                  placeholder="Tìm kiếm"
                  onChange={(e) => setState(e.target.value)}
                ></input>

                <Button
                  onClick={() => handleSearch()}
                  sx={{ padding: "8px", cursor: "pointer" }}
                >
                  <SearchIcon
                    sx={{ fontSize: "22px", cursor: "pointer", color: "white" }}
                    color="black"
                  />
                </Button>
              </Box>
              <div className="topbar-icons-shoppingBag">
                <Modal
                  onClose={handleCloseAuthClose}
                  aria-labelledby="modal-modal-title"
                  open={isAuthenticated}
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style} style={{ borderRadius: "20px" }}>
                    {location.pathname !== "/register" ? (
                      <AuthLogin />
                    ) : (
                      <AuthRegister />
                    )}
                  </Box>
                </Modal>
                <StyledBadge
                  badgeContent={props.jwt && props.cartItems.length}
                  onClick={handleClickCart}
                  color="secondary"
                >
                  <ShoppingCartOutlinedIcon
                    sx={{ fontSize: "3rem", color: "black", cursor: "pointer" }}
                  />
                </StyledBadge>
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
