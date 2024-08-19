import React from "react";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import ArrowDropDownOutlinedIcon from "@mui/icons-material/ArrowDropDownOutlined";
import SettingsIcon from "@mui/icons-material/Settings";
import MailIcon from "@mui/icons-material/Mail";
import { Badge, Box } from "@mui/material";
const Header = () => {
  return (
    <div className="admin--header">
      <div className="admin--header--content">
        <Badge badgeContent={4} color="secondary">
          <MailIcon color="action" />
        </Badge>
        <SettingsIcon></SettingsIcon>
        <Box sx={{display: "flex", justifyContent: "center", alignItems: "center"}}>
          <AccountCircleOutlinedIcon></AccountCircleOutlinedIcon>
          <span>admin</span>
    
        </Box>
      </div>
    </div>
  );
};

export default Header;
