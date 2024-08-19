import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import React from "react";
import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PhonelinkIcon from "@mui/icons-material/Phonelink";
import BarChartIcon from '@mui/icons-material/BarChart';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import QuestionMarkIcon from '@mui/icons-material/QuestionMark';
import { Moving, Person } from "@mui/icons-material";
import { Box, SvgIcon, Typography } from "@mui/material";
import Paper from "@mui/material/Paper";
const Home = () => {
  const Item = styled(Paper)(({ theme }) => ({
    // backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    backgroundColor: "rgb(30, 30, 30)",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    color: theme.palette.text.secondary,
    height: "100%",
  }));
  return (
    <div className="home">
       <Grid sx={{flexGrow: "0", marginBottom: "1rem"}} container spacing={1}>
          <Grid className="home-card" col item xs={4}>
            <Item>
              <h3 className="home-card-title">Shop teelab</h3>
              <Typography sx={{fontSize: "1.5rem", color: "white", marginBottom: "2rem"}}>Congratulations </Typography>
              <Grid container  spacing={1}>
                <Grid sx={{display: "flex", flexDirection: "column", justifyContent: "space-around"}} item xs={8}>
                  <Typography sx={{fontSize: "3rem", color: "violet!important", marginBottom: "2rem"}}>{420.8}k</Typography>
                  <Button
                    variant="contained"
                    sx={{fontSize: "1.5rem", backgroundColor: "violet", width: "50%" }}
                  >
                    View Sales
                  </Button>
                </Grid>
                <Grid item xs={4}>
                  <img
                    className="img-fluid"
                    src="/img/Lovepik_com-401951242-trophy.png"
                  ></img>
                </Grid>
              </Grid>
            </Item>
          </Grid>
          <Grid className="home-card" item xs={8}>
            <Item>
              <h3 className="home-card-title">Monthly Overview</h3>
              <Typography sx={{fontSize: "2rem", color: "white", margin: "3rem 0 6rem 0"}}>Total 48.5% growth icon this month</Typography>
              <Grid container spacing={2}>
                <Grid className="home-card-icons" item xs={3}>
                  <Moving
                    sx={{ backgroundColor: "violet", color: "white" }}
                  ></Moving>
                  <Box sx={{ marginLeft: "1rem" }}>
                    <p>Sales</p>
                    <p>245k</p>
                  </Box>
                </Grid>
                <Grid className="home-card-icons" item xs={3}>
                  <Person
                    sx={{ backgroundColor: "green", color: "white" }}
                  ></Person>
                  <Box sx={{ marginLeft: "1rem" }}>
                    <p>Customers</p>
                    <p>245k</p>
                  </Box>
                </Grid>
                <Grid className="home-card-icons" item xs={3}>
                  <PhonelinkIcon
                    sx={{ backgroundColor: "orange", color: "white" }}
                  ></PhonelinkIcon>
                  <Box sx={{ marginLeft: "1rem" }}>
                    <p>Products</p>
                    <p>245k</p>
                  </Box>
                </Grid>
                <Grid className="home-card-icons" item xs={3}>
                  <AttachMoneyIcon
                    sx={{ backgroundColor: "aqua", color: "white" }}
                  ></AttachMoneyIcon>
                  <Box sx={{ marginLeft: "1rem" }}>
                    <p>Revenue</p>
                    <p>245k</p>
                  </Box>
                </Grid>
              </Grid>
            </Item>
          </Grid>
        </Grid>
        <Grid sx={{flexGrow: "1"}} container spacing={1}>
          <Grid className="home-card" item xs={4}>
            <Item>
              <h3 className="home-card-title">Weekly Overview</h3>
              biểu đồ
              <Button variant="container" sx={{ backgroundColor: "violet" }}>
                Details
              </Button>
            </Item>
          </Grid>
          <Grid className="home-card" item xs={4}>
            <Item>
              <h3 className="home-card-title">Total Earning</h3>
              <Typography component={'p'} sx={{fontSize: "4rem", color: "white", margin: '2rem 0'}}>
                $24,895 <Typography component={'span'} fontSize={'2rem'} color={'green'}>10%</Typography>
              </Typography>
              <Typography margin={'1rem 0 5rem 0'}>Compared to $84,352$ last year</Typography>
              <Box sx={{display: "flex", width: '100%', marginBottom: '2rem'}}>
                <Typography sx={{width: '6rem', height: '6rem'}} component={'img'} src="/img/cup.jpg"></Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", width: '100%', marginLeft: '1rem'}}>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold'}}>Category</Typography>
                  <Typography sx={{ fontSize: '1.8rem'}}>$24,895.95</Typography>
                </Box>
              </Box>
              <Box sx={{display: "flex", width: '100%', marginBottom: '2rem'}}>
                <Typography sx={{width: '6rem', height: '6rem'}} component={'img'} src="/img/cup.jpg"></Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", width: '100%', marginLeft: '1rem'}}>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold'}}>Category</Typography>
                  <Typography sx={{ fontSize: '1.8rem'}}>$24,895.95</Typography>
                </Box>
              </Box>
              <Box sx={{display: "flex", width: '100%', marginBottom: '2rem'}}>
                <Typography sx={{width: '6rem', height: '6rem'}} component={'img'} src="/img/cup.jpg"></Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", width: '100%', marginLeft: '1rem'}}>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold'}}>Category</Typography>
                  <Typography sx={{ fontSize: '1.8rem'}}>$24,895.95</Typography>
                </Box>
              </Box>
              <Box sx={{display: "flex", width: '100%', marginBottom: '2rem'}}>
                <Typography sx={{width: '6rem', height: '6rem'}} component={'img'} src="/img/cup.jpg"></Typography>
                <Box sx={{display: "flex", justifyContent: "space-between", width: '100%', marginLeft: '1rem'}}>
                <Typography sx={{ fontSize: '1.8rem', fontWeight: 'bold'}}>Category</Typography>
                  <Typography sx={{ fontSize: '1.8rem'}}>$24,895.95</Typography>
                </Box>
              </Box>
              
              
              
            </Item>
          </Grid>
          <Grid className="home-card" item xs={4}>
            <Item sx={{backgroundColor: '#020233!important', padding: '0!important'}}>
            <Grid height={'101%'} container spacing={1}>
                <Grid item xs={6}>
                  <Item ><BarChartIcon sx={{color: 'white' ,backgroundColor: 'green', width: '3rem', height: '3rem', borderRadius: '50%', padding: '0.3rem'}}></BarChartIcon>
                  <Typography sx={{fontSize: '1.5rem', marginTop: '2rem'}} className="home-card-title">Total profit</Typography>
                  <Typography component={'p'} sx={{fontSize: "2rem", color: "white", margin: '2rem 0'}}>
                $24,895 <Typography component={'span'} fontSize={'2rem'} color={'green'}>10%</Typography>
              </Typography>
                  <p>Weekly profit</p></Item>
                </Grid>
                <Grid item xs={6}>
                  <Item><AttachMoneyIcon sx={{color: 'white' ,backgroundColor: 'pink', width: '3rem', height: '3rem', borderRadius: '50%', padding: '0.3rem'}}></AttachMoneyIcon>
                  <Typography sx={{fontSize: '1.5rem', marginTop: '2rem'}} className="home-card-title">Total profit</Typography>
                  <Typography component={'p'} sx={{fontSize: "2rem", color: "white", margin: '2rem 0'}}>
                $24,895 <Typography component={'span'} fontSize={'2rem'} color={'green'}>10%</Typography>
              </Typography>
                  <p>Weekly profit</p></Item>
                </Grid>
                <Grid item xs={6}>
                <Item>  <BusinessCenterIcon sx={{color: 'white' ,backgroundColor: 'violet', width: '3rem', height: '3rem', borderRadius: '50%', padding: '0.3rem'}}></BusinessCenterIcon>
                  <Typography sx={{fontSize: '1.5rem', marginTop: '2rem'}} className="home-card-title">Total profit</Typography>
                  <Typography component={'p'} sx={{fontSize: "2rem", color: "white", margin: '2rem 0'}}>
                $24,895 <Typography component={'span'} fontSize={'2rem'} color={'green'}>10%</Typography>
              </Typography>
                  <p>Weekly profit</p></Item>
                </Grid>
                <Grid item xs={6}>
                 <Item> <QuestionMarkIcon sx={{color: 'white' ,backgroundColor: 'orange', width: '3rem', height: '3rem', borderRadius: '50%', padding: '0.3rem'}}></QuestionMarkIcon>
                  <Typography sx={{fontSize: '1.5rem', marginTop: '2rem'}} component={'h3'} className="home-card-title">Total profit</Typography>
                  <Typography component={'p'} sx={{fontSize: "2rem", color: "white", margin: '2rem 0'}}>
                $24,895 <Typography component={'span'} fontSize={'2rem'} color={'green'}>10%</Typography>
              </Typography>
                  <p>Weekly profit</p></Item>
                </Grid>
              </Grid>
            </Item>
             
       
          </Grid>
        </Grid>
    </div>
  );
};

export default Home;
