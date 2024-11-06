import React from 'react';
import { useSelector } from 'react-redux';
import StandAloneInputField from '../sharedComponents/StandAloneInputField';

export default function CommentPrompt({ announcementId }) {
  const userPicture =
    useSelector((state) => state.ui.getIn(['user', 'pictureThumbnail'])) ||
    'https://picsum.photos/100';
  function submitComment(commentText) {
    console.log(commentText);
  }
  return (
    <div>
      <img src={userPicture} alt="user" />
      <StandAloneInputField
        onSubmit={submitComment}
        placeholder="Write your comment here..."
      />
    </div>
  );
}
