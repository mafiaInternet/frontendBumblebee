import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import InputBase from "@mui/material/InputBase";

import TemporaryDrawer from "./Demo";
import Topbar from "./Topbar";

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function PrimarySearchAppBar(props) {
  return (
    <Box
      sx={{
        flexGrow: 1,
        display: { lg: "none" },
        position: "sticky",
        width: "100%",
        zIndex: 9999,
      }}
    >
      <AppBar
        sx={{
          backgroundColor: "#F5F5F5",
        }}
        position="static"
      >
        <Toolbar sx={{ display: "flex", justifyContent: "space-between" }}>
          <TemporaryDrawer></TemporaryDrawer>
          <Topbar jwt={props.jwt} cartItems={props.cartItems}></Topbar>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
