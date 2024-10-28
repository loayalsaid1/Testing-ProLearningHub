import React, { useState } from 'react';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';

export default function Register({setType}) {
  const [step, setStep] = useState(1);
  const [userData, setUserData] = useState({
    username: '',
    email: '',
    password: '',
    firstName: '',
    lastName: '',
 });

 function handleInputChange(field, value) {
   setUserData((prevState) => ({
    ...prevState,
    [field]: value
  }))
 }

  return (
    <>
      {step === 1 ? (
        <RegisterStepOne setStep={setStep} userData={userData} handleInputChange={handleInputChange} />
      ) : (
        <RegisterStepTwo setStep={setStep} userData={userData} handleInputChange={handleInputChange} />
      )}
			<p>Have an account already?</p>
      <button onClick={() => setType('login')}>Login</button>
    </>
  );
}
