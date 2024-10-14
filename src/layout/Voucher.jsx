import { Box, Checkbox, FormControlLabel } from "@mui/material";
import React from "react";

const Voucher = ({ voucher, key, selected, isSelectedVoucher }) => {
  return (
    <div className="voucher--card" key={key}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xlink="http://www.w3.org/1999/xlink"
        class="coupon_bg"
        viewBox="7.5 -2"
      >
        <path
          d="M 110 144 h -98 a 12 12 0 0 1 -12 -12 v -122 a 12 12 0 0 1 12 -12 H 110 a 12.02 12 0 0 0 24 0 H 1800 a 12 12 0 0 1 12 12 V 132 a 12 12 0 0 1 -12 12 H 134 v 0 a 12 12 0 0 0 -24 0 v 0 Z"
          fill="#fff"
        ></path>
      </svg>
      <Box
        sx={{
          position: "absolute",
          top: "0px",
          left: "0px",
          width: "100%",
          height: "100%",
          display: "flex",
          zIndex: "1",
        }}
      >
        <div className="voucher--card--img">
          <img loading="lazy" className="img-fluid" src="/img/voucher/ico_gift.svg"></img>
        </div>
        <div className="voucher--card--info">
          <div>
            <h5 className="voucher--card--info--title">{voucher.name}</h5>
            <p className="voucher--card--info--decs">{voucher.description}</p>
          </div>
          {selected === undefined ? (
            <span></span>
          ) : (
            <FormControlLabel
              control={<Checkbox />}
              label="Áp dụng"
              checked={voucher.id === selected.id}
              onChange={() => isSelectedVoucher(voucher)}
            />
          )}
        </div>
      </Box>
    </div>
  );
};

export default Voucher;
