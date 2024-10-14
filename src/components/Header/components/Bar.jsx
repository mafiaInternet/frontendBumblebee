import * as React from "react";

import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import SearchIcon from "@mui/icons-material/Search";
import { search } from "../../../config/characterInputConfig.jsx";
import TemporaryDrawer from "./Demo";
import Topbar from "./Topbar";
import { useState } from "react";
import { Button } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";

export default function Bar(props) {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const navigate = useNavigate();
  const [state, setState] = useState("");
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
          <TemporaryDrawer />
          <Topbar jwt={props.jwt} cartItems={props.cartItems} />
        </Toolbar>
        <hr style={{color: 'black'}}></hr>
        <Box
          className="topbar-icons-search"
          sx={{
            border: "none",
            padding: "1rem 2rem",
            justifyContent: "space-between",
          }}
        >
          <input
            style={{ flexGrow: "1" }}
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
      </AppBar>
    </Box>
  );
}
