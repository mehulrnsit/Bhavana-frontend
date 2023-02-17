import * as React from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Paper from "@mui/material/Paper";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import image from "../Images/Main.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";


// import request from "request";

function Copyright(props) {
  return (
    <Typography variant="body2" color="white" align="center" {...props}>
      {"Copyright © "}
      <Link to="/" style={{color:"white"}}>
        BHAVANA
      </Link>{" "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

const theme = createTheme();
const Login = () => {
  let navigate = useNavigate();
  const baseUrl = "https://a315-49-207-227-224.in.ngrok.io/";
  const handleSubmit = (event) => {
    event.preventDefault();
    navigate("/home")
    const loginData = new FormData(event.currentTarget);
    
    const email = loginData.get("email");
    const password = loginData.get("password");
    var data = JSON.stringify({
      "email": email,
      "password": password
    });
    
    var config = {
      method: 'post',
      url: baseUrl + 'login',
      headers: { 
        'Content-Type': 'application/json'
      },
      data : data
    };
    
    axios(config)
    .then(function (response) {
      console.log(JSON.stringify(response.data));
      const res = response.data;
      if(res === "Success")
      {
        localStorage.setItem('user', data)
        navigate("/home")
      }
      else{
        alert("Username or Password mismacthed");
      }
    })
    .catch(function (error) {
      console.log(error);
      alert("Unable to reach server");
    });    
  };

  return (
    <ThemeProvider theme={theme}>
      <Grid container component="main" sx={{ height: "100vh" }}>
        <CssBaseline />
        <Grid
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light"
                ? t.palette.grey[50]
                : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
          style={{ backgroundColor: "rgb(30 81 132)", color: "white" }}
        >
          <Box
            sx={{
              my: 8,
              mx: 4,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
              <LockOutlinedIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              noValidate
              onSubmit={handleSubmit}
              sx={{ mt: 1 }}
            >
              <TextField
                sx={{ input: { color: "white" } }}
                InputLabelProps={{
                  style: {
                    color: "white",
                    marginTop: "-4px",
                  },
                }}
                // color="secondary"
                margin="normal"
                required
                fullWidth
                id="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
              />
              <TextField
                sx={{ input: { color: "white" } }}
                InputLabelProps={{
                  style: {
                    color: "white",
                    marginTop: "-4px",
                  },
                }}
                // color="secondary"
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                Sign In
              </Button>
              <Grid container>
                <Grid item>
                  <Link
                    to="/signup"
                    variant="body2"
                    style={{ color: "white", textDecoration: "none" }}
                  >
                    <Button variant="text" style={{ color: "white"}}>Don't have an account? Sign Up</Button>
                  </Link>
                  {/* <Link to="/signup" style={{textDecoration:"none",color:"white"}}><Button
                color="inherit"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                SignUp
              </Button></Link> */}
                </Grid>
              </Grid>
              <Copyright sx={{ mt: 5 }} />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
};

export default Login;
