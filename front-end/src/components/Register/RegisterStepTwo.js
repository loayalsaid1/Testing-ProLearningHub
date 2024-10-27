import React, { useState } from 'react';
import { IKContext, IKUpload } from 'imagekitio-react';

const urlEndpoint = 'https://ik.imagekit.io/loayalsaid1/proLearningHub';
const publicKey = 'public_tTc9vCi5O7L8WVAQquK6vQWNx08=';
const authenticator = () => {
  return new Promise((resolve, reject) => {
    // Fetch the authentication parameters from your backend
    fetch('http://localhost:3000/auth/imagekit')
      .then((response) => response.json())
      .then((data) => resolve(data))
      .catch((error) => reject(error));
  });
};



export default function RegisterStepTwo({ setStep }) {
  const [imageUrl, setImageUrl] = useState('');

  const onSuccess = (res) => {
    console.log(res);
    console.log(res.url);
    setImageUrl(res.url);
  };

  const onError = (err) => {
    console.error('Error uploading image:', err);
  };
  return (
    <>
      <button onClick={() => setStep(1)}>Back</button>
      <h1>Almost There</h1>
      <p>Please provide us with your personal information</p>
      <form>
        <label>
          First Name:
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="insert your first name"
            required
          />
        </label>
        <label>
          Last Name:
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="and your last name"
            required
          />
        </label>
        <IKContext
          publicKey={publicKey}
          urlEndpoint={urlEndpoint}
          authenticator={authenticator}
        >
          <h1>Upload Image</h1>
          <IKUpload onError={onError} onSuccess={onSuccess} />
          {imageUrl && <img src={imageUrl} width='200' alt="Uploaded" />}
        </IKContext>{' '}
        <button type="submit">Register</button>
      </form>
    </>
  );
}
