import React from 'react';
import { useSelector } from 'react-redux';

export default function CommentPrompt() {
  const userPicture =
    useSelector((state) => state.ui.getIn(['user', 'pictureThumbnail'])) ||
    'https://picsum.photos/100';
  function submitComment(commentText) {
    console.log(commentText);
  }
  return (
    <div>
      <img src={userPicture} alt="user" />
      <StandAloneComment
        onSubmit={submitComment}
        placeholder="Write your comment here..."
      />
    </div>
  );
}
