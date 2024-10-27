import React from 'react';

export default function RegisterStepOne({ setStep }) {
  return (
    <>
      <h1>Welcome to ProLearningHub</h1>
      <p>Create a new accoutn to whatever nice text is here 🙂</p>
      <form>
        <lable>
          Username:
          <input
            id="username"
            name="username"
            type="text"
            placeholder="insert a username. Only letters and numbers"
            required
            pattern="^[a-zA-Z0-9]+$"
          />
        </lable>
        <lable>
          Email:
          <input
            id="email"
            name="email"
            type="email"
            placeholder="Here insert your mail please"
            required
          />
        </lable>
        <lable>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            placeholder="And.. a password"
            new-password
          />
        </lable>
        <button type="submit" value="Next" onClick={() => setStep(2)}>
          Next
        </button>
      </form>
    </>
  );
}
