import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import { Box } from "@mui/material";

const Header = () => {
  return (
    <div
      className="admin--header"
      style={{ height: "60px", backgroundColor: "#1976d2" }}
    >
      <div
        className="admin--header--content d-flex"
        style={{ alignItems: "center", height: "100%" }}
      >
        <Box
          className="d-flex justify-content-center align-items-center"
          sx={{ marginRight: "25px" }}
        >
          <AccountCircleOutlinedIcon />
          <span>Admin</span>
        </Box>
      </div>
    </div>
  );
};

export default Header;
