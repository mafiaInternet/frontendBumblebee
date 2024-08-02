import * as React from "react";

import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Register, User } from "../../state/auth/Action";

export default function AuthRegister() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const jwt=localStorage.getItem('jwt')
  const {auth} = useSelector(store=>store)
  const [password, setPassword] = React.useState()
  const [confirmPassword, setConfirmPassword] = React.useState()
  React.useEffect(() => {
    if(jwt){
      dispatch(User(jwt))
    }
  }, [dispatch,jwt, auth.jwt])



  const handleSubmitRegister = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const userData={
      name: data.get('name'),
      birthday: data.get('birthday'),
      phone: data.get("phone"),
      email: data.get("email"),
      password: data.get("password")
    }
    
    dispatch(Register(userData))
  }
  return (
    <div className="register">
      <form className="register-form" onSubmit={handleSubmitRegister}>
      
        <h3>Đăng ký</h3>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField required id="name" name="name" label="Tên" fullWidth/>
          </Grid>
         <Grid item xs={12}>
          <TextField id="birthday" name="birthday" label="Ngày sinh" fullWidth></TextField>
         </Grid>
          <Grid item xs={12}>
            <TextField required id="phone" name="phone" label="Số điện thoại" fullWidth></TextField>
          </Grid>
          <Grid item xs={12}>
            <TextField required id="email" name="email" label="Email" fullWidth />
          </Grid>
          <Grid item xs={12}>
            <TextField required id="password" name="password" label="Mật khẩu" fullWidth onChange={(e) => setPassword(e.target.value)}/>
          
          </Grid>
          <Grid item xs={12}>
            <TextField required id="confirmPassword" name="confirmPassword" label="Xác nhận mật khẩu" fullWidth onChange={(e) => setConfirmPassword(e.target.value)}/>
          </Grid>
          <Grid item xs={12}>
     
            <Button type="submit"  disabled={confirmPassword !== password} fullWidth variant="contained">
              Đăng ký
            </Button>
          </Grid>
        </Grid>
      </form>
      <div>
      <div className="auth-link">
          <span>Đã có tài khoản</span>
          <span onClick={() => navigate("/login")}>Đăng nhập</span>
        </div>
      </div>
    </div>
  );
}
