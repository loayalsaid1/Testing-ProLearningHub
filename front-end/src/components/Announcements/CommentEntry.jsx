import React from 'react';
import { Dot } from 'lucide-react';

export default function CommentEntry({ Content }) {
  const userPicture = 'https://picsum.photos/100';

  return (
    <div data-id="testId">
      <img src={userPicture} alt="user" />
      <div>
        <p>
          Commenter Name <Dot /> x days ago
        </p>
        <p>
          Comment content Lorem ipsum dolor sit amet consectetur, adipisicing
          elit. Totam natus, rerum dolor enim minus sequi aliquid repudiandae
        </p>
      </div>
    </div>
  );
}
