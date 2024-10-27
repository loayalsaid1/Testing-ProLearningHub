import React, { useState } from "react";
import ImageKit from "imagekit-javascript"; // Make sure to install this package if not done already

// Initialize ImageKit instance
const imagekit = new ImageKit({
  publicKey: "YOUR_PUBLIC_KEY",
  urlEndpoint: "https://ik.imagekit.io/YOUR_IMAGEKIT_ID",
  authenticationEndpoint: "YOUR_AUTHENTICATION_ENDPOINT"
});

const FileUploader = () => {
  const [file, setFile] = useState(null);

  const handleFileSelect = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = () => {
    if (!file) {
      alert("No file selected!");
      return;
    }

    // Uploading using ImageKit SDK
    imagekit.upload({
      file, // the file or data URI
      fileName: file.name
    })
    .then(response => {
      console.log("Upload successful:", response);
      // Handle response after upload
    })
    .catch(error => {
      console.error("Error uploading:", error);
    });
  };

  return (
    <div>
      <input type="file" onChange={handleFileSelect} />
      <button onClick={handleUpload} disabled={!file}>Upload</button>
    </div>
  );
};

export default FileUploader;
