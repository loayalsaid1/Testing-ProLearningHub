import React, { useState } from 'react';

export default function StandAloneInputField({
  placeholder,
  onSubmit,
  initialValue = '',
}) {
  const [value, setValue] = useState(initialValue);
  const [showSubText, setShowSubText] = useState(false);

  function handleKeyDown(e) {
    if (e.key === 'Enter' && !e.shiftKey) {
      onSubmit(value);
      setValue(initialValue);
      e.preventDefault();
    } else if (e.key === 'Escape') {
      setValue(initialValue);
      setShowSubText(false);
    }
  }
  
  return (
    <div>
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onFocus={() => setShowSubText(true)}
        onBlur={() => setShowSubText(false)}
        onKeyDown={handleKeyDown}
      />
      {showSubText && (
        <p>
          Press <b>Enter</b> to submit, <b>ESC</b> to cancel, and <b>Shift</b>+
          <b>Enter</b> to go to a new line
        </p>
      )}
    </div>
  );
}
