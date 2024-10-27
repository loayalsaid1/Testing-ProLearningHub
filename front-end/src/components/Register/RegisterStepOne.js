import React from 'react';

export default function RegisterStepOne({ setStep, userData, handleInputChange }) {

  function handleSubmit(e) {
    e.preventDefault();
    setStep(2);
  }

  function handleChange(event) {
    const { name, value } = event.target;
    handleInputChange(name, value);
  }

  return (
    <>
      <h1>Welcome to ProLearningHub</h1>
      <p>Create a new accoutn to whatever nice text is here 🙂</p>
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
        <label>
          Password:
          <input
            id="password"
            name="password"
            type="password"
            value={userData.password}
            placeholder="And.. a password"
            new-password
            onChange={handleChange}
          />
        </label>
        <button type="submit" value="Next">
          Next
        </button>
      </form>
    </>
  );
}
