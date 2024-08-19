import { Button, ButtonGroup, Radio } from "@mui/material";
import React, { useState } from "react";
import { FaMoneyBillAlt } from "react-icons/fa";
const PaymentType = () => {
  const [state, setState] = useState();
  const handlPayment = (e) => {
    console.log((e.target.children[0].checked = false));
  };
  return (
    <div className="paymentType">
      <h3 className="paymentType__title">Thanh toán</h3>
      
        <Button variant="outlined" color="error" onClick={(e) => handlPayment(e)}>
          <input type="radio" value="b"  name="payment-type" />
          Thanh toán khi giao hàng
          <FaMoneyBillAlt />
        </Button>
        <Button variant="outlined" onClick={(e) => handlPayment(e)}>
          <input type="radio" value="a" name="payment-type" />
          Thanh toán online
          <FaMoneyBillAlt />
        </Button>
      
    </div>
  );
};

export default PaymentType;
