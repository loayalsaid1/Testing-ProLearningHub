import React, { useState } from 'react';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from './DiscussionEntryEditor';

export default function LectureDiscussion({ lectureId = '' }) {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  if (!lectureId)
    return <p>Am I hijacked? Where Am I rendered... no lectureID givin</p>;

  const handlePublishQuestion = (title, details) => {
    console.log('title => ', title)
    console.log('details with the real file urls =>  ', details)
    setAskNewQuestion(false);
  }

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
          <DiscussionEntryEditor onPublish={handlePublishQuestion} />
        ) : (
          // or a button?
          <p onClick={() => setAskNewQuestion(true)}>Ask a new question</p>
        )}
      </div>
    </div>
  );
}
