import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { handleCreateVoucher } from "../../../state/voucher/Action";
import { getCategory } from "../../../state/category/Action";

const Voucher = () => {
  const dispath = useDispatch()
  const {voucher, category} = useSelector(store => store)
  const [type, setType] = useState("");
  const [typeObject, setTypeObject] = useState({
    order: false,
    customer: false,
    product: false,
  });
  const [start, setStart] = useState(false);
  const [end, setEnd] = useState(false);
  const [customer, setCustomer] = useState("");
  const handleChoseTypeCustomer = (event) => {
    setCustomer(event.target.value);
  };
  const handleChoseTypeObject = (event) => {
    const value = event.target.value;
    if (value === "customer") {
      setTypeObject({
        ...typeObject,
        customer: true,
        order: false,
        product: false,
      });
    } else if (value === "order") {
      setTypeObject({
        ...typeObject,
        order: true,
        customer: false,
        product: false,
      });
      setCustomer("");
    } else if (value === "product") {
      setTypeObject({
        ...typeObject,
        product: true,
        customer: false,
        order: false,
      });
      setCustomer("");
    }
  };
  const handleChoseType = (value) => {
    setType(value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    let currentDate = new Date();
    let end = "never";
    if (data.get("end") === "number") {
      if (data.get("typeNumberEnd") === "days") {
        end = new Date(
          currentDate.getTime() +
            Number(data.get("numberEnd")) * 24 * 60 * 60 * 1000
        );
        console.log("days" + end);
      } else if (data.get("typeNumberEnd") === "months") {
        end = new Date(
          currentDate.getFullYear(),
          currentDate.getMonth() + Number(data.get("numberEnd")),
          currentDate.getDate()
        )
      }
    } else if (data.get("end") === "specific") {
      end = new Date(data.get("specificEnd"));
      console.log(end)
    }
    let start = "now"
    if(data.get("start") === "now"){
      console.log("abc")
      start = currentDate
    }else if(data.get("start") === "specificStart"){
      start = new Date(data.get("specificStart"))
    }
    const request = {
      name: data.get("name"),
      description: data.get("desc"),
      discountedPrice: Number(data.get("discountedPrice")),
      discoutedPersent: Number(data.get("discountedPersent")),
      freeShipped: data.get("freeShipped"),
      type: data.get("apply"),
      totalPriceOrdered: Number(data.get("totalPriceOrdered")),
      totalOrderedCustomer: Number(data.get("totalOrderedCustomer")),
      product: data.get("product"),
      start:new Date(start).toISOString(),
      end: end === "never" ? null : new Date(end).toISOString(),
      quantity: data.get("quantity")
    };
    console.log(request)
    dispath(handleCreateVoucher(request))
  };

  useEffect(() => {
    dispath(getCategory())
  }, [dispath])

  return category.categories && (
    <div className="voucher">
      <h2 className="admin--home--title">Thêm mã giảm giá</h2>
      <div className="container">
        <form method="POST" onSubmit={handleSubmit}>
          <div className="d-flex" style={{gap: "30px", margin: "0 30px 10px 0"}}>
            <div className="form-group">
              <label style={{fontSize: "18px"}}>Tiêu đề</label>
              <input
                type="text"
                name="name"
                placeholder="Tiêu đề mã giảm giá"
                style={{borderRadius: "10px", padding: "10px", border: "1px solid"}}
              ></input>
            </div>
            <div className="form-group">
              <label style={{fontSize: "18px"}}>Mô tả</label>
              <textarea type="text" name="desc" multiple style={{borderRadius: "10px"}}></textarea>
            </div>
          </div>
          <Box sx={{ padding: "1rem", border: "1px solid silver" }}>
            <h3 style={{fontSize: "18px"}}>Giảm giá</h3>
            <div className="voucher--type">
              <div
                className="voucher--type--card"
                onClick={() => handleChoseType("amount")}
              >
                <div>
                  <span>icon</span>
                  <p>Số tiền cố định</p>
                </div>
              </div>
              <div
                className="voucher--type--card"
                onClick={() => handleChoseType("persent")}
              >
                <div>
                  <span>icon</span>
                  <p>Phần trăm</p>
                </div>
              </div>
              <div
                className="voucher--type--card"
                onClick={() => handleChoseType("free")}
              >
                <div>
                  <span>icon</span>
                  <p>Miễn phí vận chuyển</p>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-start" style={{gap: "30px"}}>
              <Box sx={{ display: "block" }}>
                <label style={{fontSize: "18px"}}>Chiết khấu</label>
                  {type === "amount" || type === "free" ? (
                <Box sx={{ display: "flex" }}>
                  <input type="text" name="discountedPrice" style={{borderRadius: "10px", padding: "10px", border: "1px solid"}}></input>
                    <span>vnđ</span></Box>
                  ) : (   <Box sx={{ display: "flex" }}>
                    <input type="text" name="discoutedPersent" style={{borderRadius: "10px", padding: "10px", border: "1px solid"}}></input>
                    {/* <span>%</span> */}
                </Box>
                  )}
              </Box>
              <div className="form-group">
                <label style={{fontSize: "18px"}}>Số lượng</label>
                <input type="number" name="quantity" style={{borderRadius: "10px", padding: "10px", border: "1px solid"}}></input>
              </div>
            </div>
          </Box>

          <div className="voucher--applies">
            <h4 style={{fontSize: "18px"}}>Áp dụng cho</h4>
            <div className="form-group" style={{marginLeft:"20px"}}>
              <input
                type="radio"
                name="apply"
                value="order"
                onClick={handleChoseTypeObject}
              ></input>
              <label>Đơn hàng</label>
              {typeObject.order && (
                <Box
                  sx={{
                    display: "flex",
                    border: "1px solid",
                    alignItems: "center",
                    padding: "5px",
                    borderRadius: "10px"
                  }}
                >
                  <Typography
                    sx={{ border: "none", outline: "none" }}
                    component={"input"}
                    type="text"
                    name="totalPriceOrdered"
                    placeholder="Tổng đơn hàng"
                  ></Typography>
                  <span style={{fontSize: '14px'}}>vnđ</span>
                </Box>
              )}
            </div>
            <div className="form-group" style={{marginLeft:"20px"}}>
              <input
                type="radio"
                name="apply"
                value="product"
                onClick={handleChoseTypeObject}
              ></input>
              <label>Sản phẩm</label>
              {typeObject.product && (
                <Box>
                  <select name="product" style={{padding: "5px", borderRadius: "10px"}}>
                    <option>Thể loại</option>
                    {category.categories.map((item) => (
                      <option value={item.name_id}>{item.name}</option>
                    ))}
                  </select>

                  <select style={{padding: "5px", borderRadius: "10px"}}>
                    <option>Bộ sưu tập</option>
                  </select>
                </Box>
              )}
            </div>
            <div className="form-group" style={{marginLeft:"20px"}}>
              <input
                type="radio"
                name="apply"
                value="customer"
                onClick={handleChoseTypeObject}
              ></input>
              <label>Khách hàng</label>
              {typeObject.customer && (
                <select value={customer} onChange={handleChoseTypeCustomer} style={{padding: "5px", borderRadius: "10px"}}>
                  <option value={"Tất cả"}>Tất cả</option>
                  <option value={"Lựa chọn khách hàng"}>
                    Lựa chọn khách hàng
                  </option>
                  <option value={"Khách hàng thân thiết"}>
                    Khách hàng thân thiết
                  </option>
                </select>
              )}
              {customer === "Lựa chọn khách hàng" && (
                <Typography
                  sx={{ border: "1px solid", padding: '6px', borderRadius: "10px" }}
                  component={"input"}
                  type="text"
                  placeholder="Email"
                ></Typography>
              )}
              {customer === "Khách hàng thân thiết" && (
                <Box
                  sx={{
                    display: "flex",
                    border: "1px solid ",
                    alignItems: "center",
                    padding: "5px",
                    borderRadius: "10px",
                  }}
                >
                  <Typography
                    sx={{ border: "none", outline: "none" }}
                    component={"input"}
                    type="text"
                    name="totalOrderedCustomer"
                    placeholder="Đã mua"
                  ></Typography>
                  <span>vnđ</span>
                </Box>
              )}
            </div>
          </div>
          <div className="voucher--active">
            <h3 style={{fontSize: "18px"}}>Thời gian</h3>
            <div className="form-group">
              <input
                type="radio"
                value={"now"}
                name="start"
                onClick={() => setStart(false)}
              ></input>
              <label>Tại thời hiện tại</label>
            </div>
            <div className="form-group">
              <input type="radio" name="start" onClick={() => setStart(true)}></input>
              <label>Thiết lập thời gian</label>
              {start && <input type="date" name="specificStart" style={{marginLeft: "10px", borderRadius: "10px", paddingLeft: "5px"}}></input>}
            </div>
            <h4 style={{fontSize: "18px"}}>Thời điểm kết thức</h4>
            <div className="form-group">
              <input type="radio" name="end" value={"never"}></input>
              <label>Không bao giờ</label>
            </div>
            <div className="form-group">
              <input type="radio" name="end" value={"number"}></input>
              <label>Sau một số nhất định của ngày/tháng</label>
              <Box sx={{ display: "flex", alignItems: "center" }}>
                <input type="text" name="numberEnd"></input>
                <select name="typeNumberEnd">
                  <option value={"days"}>Ngày</option>
                  <option value={"months"}>Tháng</option>
                </select>
              </Box>
            </div>
            <div className="form-group">
              <input type="radio" name="end" value={"specific"}></input>
              <label>Thiết lập thời gian</label>
              <input type="date" name="specificEnd" style={{marginLeft: "10px", borderRadius: "10px", paddingLeft: "5px"}}></input>
            </div>
          </div>
          <div className="d-flex justify-content-end" style={{marginTop: "15px"}}>
            <button type="submit" className="btn btn-primary"
              style={{padding: "10px 30px", fontSize: "20px", marginRight: "20px", borderRadius: "10px"}}
            >tạo</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Voucher;
