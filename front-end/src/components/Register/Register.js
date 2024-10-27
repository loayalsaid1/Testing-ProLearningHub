import React, { useState } from 'react';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';

export default function Register({setType}) {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 ? (
        <RegisterStepOne setStep={setStep} />
      ) : (
        <RegisterStepTwo setStep={setStep} />
      )}
			<p>Have an account already?</p>
      <button onClick={() => setType('login')}>Login</button>
    </>
  );
}
