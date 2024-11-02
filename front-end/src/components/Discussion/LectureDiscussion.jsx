import React, { useState } from 'react';
import SearchField from '../sharedComponents/SearchField';

export default function LectureDiscussion({ lectureId = '' }) {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  if (!lectureId)
    return <p>Am I hijacked? Where Am I rendered... no lectureID givin</p>;

  return (
    <div>
      <h2>Lecture Discussion</h2>
      <SearchField placeholder="Search lecture questions" />
      <div>
        <h3>Question Entry here</h3>
        <h3>Question Entry here</h3>
        <h3>Question Entry here</h3>
        <h3>Question Entry here</h3>
        <h3>Question Entry here</h3>
        <h3>Question Entry here</h3>
      </div>
      {/* Depeneding on there is more or not */}
      <button type="button">See more</button>
      <div>
        {askNewQuestion ? (
          <h3>Editor with public button here</h3>
        ) : (
          // or a button?
          <p onClick={() => setAskNewQuestion(true)}>Ask a new question</p>
        )}
      </div>
    </div>
  );
}
