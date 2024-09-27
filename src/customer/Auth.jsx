import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { useLocation } from "react-router-dom";
import AuthLogin from "./auth/AuthLogin";
import AuthRegister from "./auth/AuthRegister";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: { xs: "90%", sm: "80%", md: "70%", lg: "50%" },
  margin: "0 auto",
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function Auth() {
  const location = useLocation();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div className="auth">
      <Button onClick={handleOpen}>
        <AccountCircleOutlinedIcon sx={{ fontSize: "3rem", color: "black" }}/>
        <span>Đăng nhập</span>
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} style={{ borderRadius: "20px" }}>
          {location.pathname !== "/register" ? (
            <AuthLogin/>
          ) : (
            <AuthRegister/>
          )}
        </Box>
      </Modal>
    </div>
  );
}
