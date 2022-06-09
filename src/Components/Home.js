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
// import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import FormData from "form-data";
import { FiDownload } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import CanvasJSReact from "./canvasjs.react";
import { Spinner } from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css';

var CanvasJSChart = CanvasJSReact.CanvasJSChart;

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);
  const [combinedPoints,setCombinedPoints] = useState([]);
  const [textPoints,setTextPoints] = useState([]);
  const [voicePoints,setVoicePoints] = useState([]);
  const [showOutput,setShowOutput] = useState(false);
  const [username,setUsername] = useState();
  const [load,setLoad] = useState(false);
  const navigate = useNavigate();
  
  const options = {
    exportEnabled: false,
    animationEnabled: true,
    backgroundColor: "rgb(192 123 170)",
    title: {
      text: "Combined Emotion Analysis",
      color:"white"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: combinedPoints
    }]
  }

  const options_txt = {
    exportEnabled: false,
    animationEnabled: true,
    backgroundColor: "rgb(192 123 170)",
    title: {
      text: "Text Emotion Analysis",
      color:"white"
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: textPoints
    }]
  }

  const options_voice = {
    exportEnabled: false,
    animationEnabled: true,
    backgroundColor: "rgb(192 123 170)",
    title: {
      text: "Voice Emotion Analysis",
    },
    data: [{
      type: "pie",
      startAngle: 75,
      toolTipContent: "<b>{label}</b>: {y}%",
      showInLegend: "true",
      legendText: "{label}",
      indexLabelFontSize: 16,
      indexLabel: "{label} - {y}",
      dataPoints: voicePoints
    }]
  }

  

  useEffect(() => {
    const goToMain = () => {
      navigate("/");
    }
    const loggedInUser = JSON.parse(localStorage.getItem("user"));
    console.log(loggedInUser["email"])
    if (!loggedInUser) {
     goToMain();
    }
    else{
      setUsername(loggedInUser.email)
    }
  },[])// eslint-disable-line react-hooks/exhaustive-deps
  

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

	const handleRemove = () => {
		setSelectedFile();
		setIsSelected(false);
    setShowOutput(false);
    setCombinedPoints([]);
    setVoicePoints([]);
    setTextPoints([]);
	}

  const handleLogout = () => {
   
    localStorage.clear();
    navigate("/")
  }

  const handleSubmission = (e) => {
    
    var formdata = new FormData();
    formdata.append("audioFile", selectedFile);
    setLoad(true);
    setCombinedPoints([]);
    setVoicePoints([]);
    setTextPoints([]);
    setShowOutput(false);
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
      .then((result) => {
        const resultData = result;
        const jsonData = JSON.parse(resultData);
        // console.log(jsonData["predicted_combined_map"]);
        const combined_data = jsonData["predicted_combined_map"];
        const text_data = jsonData["predicted_text_map"]
        const voice_data = jsonData["predicted_voice_map"];

        const text_points = [
          { y: text_data["Angry"], label: "Angry" },
          
          { y: text_data["Fear"], label: "Fear" },
          { y: text_data["Happy"], label: "Happy" },
          
          { y: text_data["Sad"], label: "Sad" },
         
          { y: text_data["Surprise"], label: "Surprise" }
        ]
        setTextPoints(text_points);
        const points = [
          { y: combined_data["Angry"], label: "Angry" },
          { y: combined_data["Disgust"], label: "Disgust" },
          { y: combined_data["Fear"], label: "Fear" },
          { y: combined_data["Happy"], label: "Happy" },
          { y: combined_data["Neutral"], label: "Neutral" },
          { y: combined_data["Sad"], label: "Sad" },
          
          { y: combined_data["Surprise"], label: "Surprise" }
        ]
        setCombinedPoints(points)
        
        const voice_points = [
          { y: voice_data["Angry"], label: "Angry" },
          { y: voice_data["Disgust"], label: "Disgust" },
          { y: voice_data["Fear"], label: "Fear" },
          { y: voice_data["Happy"], label: "Happy" },
          { y: voice_data["Neutral"], label: "Neutral" },
          { y: voice_data["Sad"], label: "Sad" },
          { y: voice_data["Surprise"], label: "Surprise" }
        ]
        setVoicePoints(voice_points)
        setLoad(false);
        setShowOutput(true);
      
      })
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
          <Typography variant="h6" style={{color:"white",margin:"1px 0"}}>{username}</Typography>
            {/* <Link to="/" style={{ textDecoration: "none", color: "white" }}> */}
              <Button
                color="inherit"
                style={{ fontSize: "15px", fontWeight: "600" ,color:"white"}}
                onClick={handleLogout}
              >
                Logout
              </Button>
              
            {/* </Link> */}
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
                {load === false ? <Button variant="contained" onClick={(e) => handleSubmission(e)} style={{margin:"20px 37%"}}>
                  Get Analysis
                </Button> : <></>}
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
                <Button variant="contained" component="label" color="primary" style={{margin:"20px 35%"}}>
                  {" "}
                  Upload a file
                  <input type="file"  name="file" onChange={changeHandler} hidden />
                </Button>
               
              </Box>
            )}

          </Grid>
          {load === true ? <Grid item xs={12} style={{display:"flex",justifyContent:"center"}}><Spinner
                    as="span"
                    variant="light"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    animation="border" style={{margin:"auto 10px"}}/><Typography variant="h5" style={{color:"white",textAlign:"center",display:"inline"}}>Please Wait report is being generated....</Typography></Grid>:<></>}

        </Grid>
      </Box>
      {showOutput === true ? <Box style={{backgroundColor:"rgb(192 123 170)",padding:"30px"}}>
        <CanvasJSChart options = {options} />
        <br></br>
      <CanvasJSChart options = {options_txt}/>
      <br></br>
      <CanvasJSChart options = {options_voice}/>
       <br></br>
      </Box> : <></>}
      
    </>
  );
};

export default Home;