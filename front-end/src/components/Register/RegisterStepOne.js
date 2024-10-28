import React from 'react';
import { GoogleLogin } from '@react-oauth/google';
import { googleRegister } from '../../redux/actions/uiActionCreators'
import { useDispatch } from 'react-redux';
import { registerFailure } from '../../redux/actions/uiActionCreators';
export default function RegisterStepOne({ setStep, userData, handleInputChange }) {
  const dispatch = useDispatch();
  
  function handleSubmit(e) {
    e.preventDefault();
    setStep(2);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    handleInputChange(name, value);
  }

  function handleGoogleRegisterSuccess(token) {
    dispatch(googleRegister(token.credential));
  }

  function handleGoogleRegisterFailure(error) {
    dispatch(registerFailure(error.message))
  }

  return (
    <>
      <h1>Welcome to ProLearningHub</h1>
      <p>Create a new accoutn to whatever nice text is here 🙂</p>
      <GoogleLogin
        onSuccess={handleGoogleRegisterSuccess}
        onError={handleGoogleRegisterFailure}
        theme="filled_blue"
        size="large"
        shape="circle"
        text="signup_with"
        logo_alignment="left"
        width="300"
      />
      <p>Or fill this form</p>
      <form onSubmit={handleSubmit} >
        <label>
          Username:
          <input
            id="username"
            name="username"
            type="text"
            value={userData.username || ''}
            placeholder="insert a username. Only letters and numbers"
            required
            pattern="^[a-zA-Z0-9]+$"
            onChange={handleChange}
          />
        </label>
        <hr />
        <label>
          Email:
          <input
            id="email"
            name="email"
            type="email"
            value={userData.email}
            placeholder="Here insert your mail please"
            required
            onChange={handleChange}
          />
        </label>
        <hr />
        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            placeholder="And.. a password"
            new-password="true"
            onChange={handleChange}
          />
        </label>
        <hr />
        <button type="submit" value="Next">
          Next
        </button>
      </form>
    </>
  );
}
