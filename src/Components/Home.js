import React from "react";
import { useState } from "react";
import axios from "axios";
// import * as fs from 'fs';
import FormData from "form-data";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
		setSelectedFile(event.target.files[0]);
		setIsSelected(true);
	};

	const handleSubmission = () => {
    var formdata = new FormData();
    formdata.append("audioFile", selectedFile);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch("https://bef1-49-207-193-208.in.ngrok.io/emotion-detection", requestOptions)
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  return(
    <>
      <input type="file" name="file" onChange={changeHandler} />
			{isSelected ? (
				<div>
					<p>Filename: {selectedFile.name}</p>
					<p>Filetype: {selectedFile.type}</p>
					<p>Size in bytes: {selectedFile.size}</p>
					<p>
						lastModifiedDate:{' '}
						{selectedFile.lastModifiedDate.toLocaleDateString()}
					</p>
				</div>
			) : (
				<p>Select a file to show details</p>
			)}
			<div>
				<button onClick={handleSubmission}>Submit</button>
			</div>
    </>
  );
}

export default Home;