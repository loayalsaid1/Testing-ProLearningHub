import React from 'react';

export default function RegisterStepTwo({ setStep }) {
  return (
    <>
      <button onClick={() => setStep(1)}>Back</button>
      <h1>Almost There</h1>
      <p>Please provide us with your personal information</p>
      <form>
        <lable>
          First Name:
          <input
            id="firstName"
            name="firstName"
            type="text"
            placeholder="insert your first name"
            required
          />
        </lable>
        <lable>
          Last Name:
          <input
            id="lastName"
            name="lastName"
            type="text"
            placeholder="and your last name"
            required
          />
        </lable>
        <input id="profilePicture" name="profilePicture" type="file" />
        <button type="submit">Register</button>
      </form>
    </>
  );
}
