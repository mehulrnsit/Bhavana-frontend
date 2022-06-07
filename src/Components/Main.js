import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Button,
  Stack,
  Box,
  Grid,
} from "@mui/material";
import { Link } from "react-router-dom";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./Main.css";
import image from "../Images/svg.svg";

const Main = () => {

  return (
    <>
      <div className="main">
        <AppBar
          position="static"
          color="transparent"
          style={{ backgroundColor: "rgb(109 17 117)" }}
        >
          <Toolbar>
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="logo"
            >
              <EmojiEmotionsIcon />
            </IconButton>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              color="white"
            >
              BHAVANA
            </Typography>
            <Stack direction="row" spacing={2}>
              <Link to="/login" style={{textDecoration:"none",color:"white"}}><Button 
                color="inherit"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                Login
              </Button></Link>
              <Link to="/signup" style={{textDecoration:"none",color:"white"}}><Button
                color="inherit"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                SignUp
              </Button></Link>
            </Stack>
          </Toolbar>
        </AppBar>
      </div>
      <Box
        style={{
          minHeight: "600px",
          color: "white",
          backgroundImage:
            "linear-gradient(to right top, #370519, #57003a, #6d0c6a, #6b2ea7, #1254eb)",
        }}
      >
        <Grid
          container
          spacing={4}
          style={{
            marginTop: "0px",
            minHeight: "90%",
          }}
        >
          <Grid item xs={6}>
            <Typography
              variant="h2"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ lineHeight: "1.5", padding: "5% 5%" }}
            >
              One Stop Solution to Get Complete Emotion Analysis
            </Typography>
            <Stack spacing={4} direction="row" style={{marginLeft:"5%"}}>
            <Link to="/login" style={{textDecoration:"none",color:"white"}}><Button variant="outlined" style={{color:"white",border:"2px solid white"}}>Login</Button></Link>
            <Link to="/signup" style={{textDecoration:"none",color:"white"}}><Button variant="outlined" style={{color:"white",border:"2px solid white"}}>SignUp</Button></Link>
            </Stack>
            {/* <Grid item xs={6}>

          </Grid>
          <Grid item xs={6}>

          </Grid>
           */}
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            <img src={image} alt="" className="svg" />
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Main;
