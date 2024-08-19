import { Button, Grid } from "@mui/material";
import React, {useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editUserById } from "../../../state/action/CustomerAction";


const ChangeCustomer = () => {
  const dispatch = useDispatch();
  const { customer } = useSelector((store) => store);
  const [data, setData] = useState(customer.customer && customer.customer &&{
    name: customer.customer.name,
    email: customer.customer.email,
  })
  const [file, setFile] =useState(null)
  const handleEditUser = (event) => {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    const request = {
        id: customer.customer.id,
        name: data.get("name"),
        email: data.get("email"),
        password: data.get("password"),
        phone: data.get("phone"),
        role: data.get("role")
    }
    dispatch(editUserById(request))
  }

  console.log(customer)


  return customer.customer && customer.customer && (
        <div className="customer--edit">
      <h2 className="customer--edit--title">Thêm người dùng mới</h2>
      <div className="customer--edit--content">
        <div className="customer--edit--content--img">
         
          <img className="img-fluid" src={file != null ? URL.createObjectURL(file[0]) : "/img/user.png"} alt="img--avatar"></img>
            <input type="file" onChange={(e) => setFile(e.target.files)}></input>
  
        </div>
        <form className="customer--edit--content--form" method="POST" onSubmit={handleEditUser}>
          <Grid container spacing={1}>
            <Grid item xs={6}>
              <label>Họ và tên *</label>
              <input
                type="text"
                value={data && data.name}
                onChange={(e) => setData({...data, name: e.target.value})}
                name="name"
                placeholder="Họ và tên"
                required
              ></input>
            </Grid>
            <Grid item xs={6}>
              <lable>Email *</lable>
              <input
                type="text"
                value={data && data.email}
                onChange={(e) => setData({...data, email: e.target.value})}
                name="email"
                placeholder="Email"
                required
              ></input>
            </Grid>
            <Grid item xs={6}>
              <label>Mật khẩu *</label>
              <input type="password"
                name="password"
               required></input>
              
            </Grid>
            <Grid item xs={6}>
              <label>Nhập lại mật khẩu *</label>
              <input type="password" required></input>
            </Grid>
            <Grid item xs={6}>
              <label>Số điện thoại</label>
              <input type="text" name="phone" placeholder="Số điện thoại"></input>
            </Grid>
            <Grid item container spacing={1} xs={12}>
            <Grid item xs={4}>
              <label>Chọn tỉnh / Thành phố</label>
              <input></input>
            </Grid>
            <Grid item xs={4}>
              <label>Quận / Huyện</label>
              <input></input>
            </Grid>
            <Grid item xs={4}>
              <label>Phường / Xã</label>
              <input></input>
            </Grid>
            </Grid>
            <Grid item xs={12}>
              <label>Nhập địa chỉ cụ thể</label>
              <input type="text" placeholder="Nhập địa chỉ cụ thể"></input>
            </Grid>
            <Grid item xs={12}>
              <label>Ủy quyền</label>
              <select name="role">
                <option value="customer">Tài khoản khách hàng</option>
                <option value="admin">Quản trị viên</option>
              </select>
            </Grid>
          </Grid>
          <Button variant="contained" color="success" type="submit">
            Lưu thay đổi
          </Button>
        </form>
      </div>
    </div>
    )
};

export default ChangeCustomer;
