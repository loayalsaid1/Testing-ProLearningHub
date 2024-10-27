import React, { useState } from 'react';
import RegisterStepOne from './RegisterStepOne';
import RegisterStepTwo from './RegisterStepTwo';

export default function Register() {
  const [step, setStep] = useState(1);

  return (
    <>
      {step === 1 ? (
        <RegisterStepOne setStep={setStep} />
      ) : (
        <RegisterStepTwo setStep={setStep} />
      )}

      <p>
        Already have an account? <a href="/login">Login</a>
      </p>
    </>
  );
}
