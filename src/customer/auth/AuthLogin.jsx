import * as React from "react";
import TextField from "@mui/material/TextField";
import { Button, Grid, Typography } from "@mui/material";
import {useLocation, useNavigate } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";
import { GetAdmin, Login, User } from "../../state/auth/Action";

export default function AuthLogin() {
  const location = useLocation()
  const navigate = useNavigate();
  const dispatch=useDispatch();
  const jwt = localStorage.getItem("jwt")
  const {auth} = useSelector(store=>store)
  React.useEffect(() => {
    if(jwt){
      dispatch(User(jwt))
      navigate("/home")
    }
   
  }, [dispatch,jwt, auth.jwt])
 
  const handleSubmitLogin = (event) =>{
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const userData={
      email: data.get("email"),
      password: data.get("password")
    }
    dispatch(Login(userData))

   
  }
  return (
    <div className="login">
      <form className="login-form" method="POST" onSubmit={handleSubmitLogin}>
          <Typography class="title" component='h3'>Đăng nhập</Typography>
        <Grid container spacing={3}>
   
          <Grid item xs={12} >
            <TextField
            required
              id="email"
              label="Email"
              name="email"
              fullWidth
              autoComplete="email"
            />
          </Grid>
          <Grid item xs={12}>
         
            <TextField
            type="password"
            required
              id="password"
              label="Password"
              name="password"
              fullWidth
              autoComplete="password"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" fullWidth color="error" variant="contained">Đăng nhập</Button>
          </Grid>
        </Grid>
        
        </form>
      {location.pathname != "/admin" && <div className="auth-link">
        <div>
          <span>Chưa có tài khoản</span>
          <span onClick={() => navigate("/register")}>Đăng ký</span>
        </div>
      </div>
    }
      
    </div>
  );
}

// export default AuthLogin();
