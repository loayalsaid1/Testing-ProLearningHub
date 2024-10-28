import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import ImageKit from "imagekit-javascript";
import { formRegister,  setError, toggleLoading } from '../../redux/actions/uiActionCreators';

const imagekit = new ImageKit({
  publicKey: "public_tTc9vCi5O7L8WVAQquK6vQWNx08=",
  urlEndpoint: "https://ik.imagekit.io/loayalsaid1/proLearningHub",
});

export default function RegisterStepTwo({
  setStep,
  userData,
  handleInputChange,
}) {
  const [imageUrl, setImageUrl] = useState('');
  const [file, setFile] = useState(null);
  const dispatch = useDispatch();
  const isLoading = useSelector(state => state.ui.get('isLoading'));

  function handleChange(event) {
    const { name, value } = event.target;
    handleInputChange(name, value);
  }

  function handleFileSelect(event) {

    const file = event.target.files[0];
    setFile(file);

    const url = URL.createObjectURL(file);
    setImageUrl(url);
  }

  async function uploadImage(file) {
    try {
      dispatch(toggleLoading())
      const response = await fetch("http://localhost:3000/auth/imagekit");
      const authParams = await response.json();

      const uploadResponse = await imagekit.upload({
        file,
        fileName: file.name,
        ...authParams,
      });
      dispatch(toggleLoading())
      return { id: uploadResponse.fileId, url: uploadResponse.url };
    } catch (error) {
      console.error("Error uploading image:", error);
      dispatch(setError('auth', 'Error uploading the profile image!'));
      dispatch(toggleLoading())
      return { id: '', url: '' };
    }
  }

  async function handleSubmit(event) {
    event.preventDefault();
    if (file) {
      const { id, url } = await uploadImage(file);
      handleInputChange('profilePicture', { id, url });
    }    
    dispatch(formRegister(userData))
  }
  return (
    <>
      <button onClick={() => setStep(1)}>Back</button>
      <h1>Almost There</h1>
      <p>Please provide us with your personal information</p>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            id="firstName"
            name="firstName"
            type="text"
            value={userData.firstName}
            placeholder="insert your first name"
            required
            onChange={handleChange}
          />
        </label>
        <hr />
        <label>
          Last Name:
          <input
            id="lastName"
            name="lastName"
            type="text"
            value={userData.lastName}
            placeholder="and your last name"
            required
            onChange={handleChange}
          />
        </label>
        {imageUrl && <img src={imageUrl} width="200" alt="Uploaded" />}
        <hr />
        <label>
          Profile Picture:
          <input id='profilePicture' name="profilePicture" type="file" onChange={handleFileSelect}/>
        </label>
        <hr />
        <button type="submit" disabled={isLoading} >Register</button>
      </form>
    </>
  );
}
