import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, Box } from "@mui/material";

const Header = () => {
  return (
    <div className="admin--header" style={{height: "60px", backgroundColor: "#1976d2"}}>
      <div className="admin--header--content d-flex" style={{alignItems: "center", height: "100%"}}>
        <Badge badgeContent={4} color="secondary" sx={{margin: "0 5px"}}>
          <MailIcon color="action" />
        </Badge>
        <div style={{margin: "0 5px"}}>
          <SettingsIcon/>
        </div>
        <Box className="d-flex justify-content-center align-items-center" sx={{marginRight: "25px"}}>
          <AccountCircleOutlinedIcon/>
          <span>Admin</span>
        </Box>
      </div>
    </div>
  );
};

export default Header;
