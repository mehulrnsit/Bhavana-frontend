import React from "react";
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
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import { Link } from "react-router-dom";
import { useState } from "react";
import FormData from "form-data";
import { FiDownload } from "react-icons/fi";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

	const handleRemove = () => {
		setSelectedFile();
		setIsSelected(false);
	}

  const handleSubmission = () => {
    var formdata = new FormData();
    formdata.append("audioFile", selectedFile);

    var requestOptions = {
      method: "POST",
      body: formdata,
      redirect: "follow",
    };

    fetch(
      "https://bef1-49-207-193-208.in.ngrok.io/emotion-detection",
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  return (
    <>
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
            <EmojiEmotionsIcon style={{ color: "white" }} />
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
            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <Button
                color="inherit"
                style={{ fontSize: "15px", fontWeight: "600" }}
              >
                Logout
              </Button>
            </Link>
          </Stack>
        </Toolbar>
      </AppBar>
      <Box
        style={{
          minHeight: "650px",
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
              variant="h3"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ lineHeight: "1.5", padding: "3% 5% 2%" }}
            >
              Instruction To Use
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ lineHeight: "1.5", padding: "3% 5% 2%" }}
            >
              Upload an audio file by browsing through your System.
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ lineHeight: "1.5", padding: "1% 5%" }}
            >
              Audio File must be in .wav extension.
            </Typography>
            <Typography
              variant="h4"
              component="div"
              sx={{ flexGrow: 1 }}
              style={{ lineHeight: "1.5", padding: "1% 5%" }}
            >
              Make sure to upload audio file of not more than 10 seconds.
            </Typography>
            <a
              href="https://voicecoach.ai/voice-recorder"
              target="_blank"
              style={{ color: "white" }}
							rel="noreferrer" 
            >
              <Typography
                variant="h6"
                component="div"
                sx={{ flexGrow: 1 }}
                style={{ lineHeight: "1.5", padding: "1% 5%" }}
              >
                Don't have audio file? Click Here.
              </Typography>
            </a>
          </Grid>
          <Grid
            item
            xs={6}
            style={{ display: "flex", justifyContent: "center" }}
          >
            {isSelected ? (
              <Box style={{
								border: "1.5px solid white",
								width: "100%",
								marginRight: "20px",
								padding: "10px",
							}}>
                <Typography variant="h5" style={{textAlign:"center",lineHeight:"1.5",margin:"50px 0 10px"} }>
                  Filename: {selectedFile.name}
                </Typography>
                <Typography variant="h5" style={{textAlign:"center",lineHeight:"1.5",margin:"10px 0"}}>Filetype: {selectedFile.type}</Typography>
                <Typography variant="h5" style={{textAlign:"center",lineHeight:"1.5",margin:"10px 0"}}>Size in bytes: {selectedFile.size}</Typography>
                <Typography variant="h5" style={{textAlign:"center",lineHeight:"1.5",margin:"10px 0"}}>
                  Last Modified Date:{" "}
                  {selectedFile.lastModifiedDate.toLocaleDateString()}
									</Typography>
									<Button variant="contained" onClick={handleRemove} style={{margin:"20px 37%",backgroundColor:"black"}}>
                  Remove File
                </Button>
                <Button variant="contained" onClick={handleSubmission} style={{margin:"20px 37%"}}>
                  Get Analysis
                </Button>
              </Box>
            ) : (
              <Box
                style={{
                  border: "2.5px dashed white",
                  width: "100%",
                  marginRight: "20px",
                  padding: "10px",
                }}
              >
                <FiDownload
                  style={{
                    fontSize: "150px",
                    margin: "50px 35%",
                  }}
                />
                {/* <p>Select a file to show details</p> */}
                <Button variant="contained" component="label" color="primary" style={{margin:"20px 35%"}}>
                  {" "}
                  Upload a file
                  <input type="file"  name="file" onChange={changeHandler} hidden />
                </Button>
                {/* <input type="file" name="file" onChange={changeHandler} /> */}
              </Box>
            )}
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default Home;
