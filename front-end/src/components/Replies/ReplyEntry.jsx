import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function ReplyEntry({ content }) {
  const date = formatDate(content.get('updatedAt'));
  // This should be comming fomr the reponse already;
  const [upvoted, setUpvoted] = useState(content.get('upvoted') || false);

  return (
    <div className="card mb-2 p-3 d-flex flex-row align-items-start">
      <img 
        src={content?.getIn(['user', 'pictureThumbnail']) || 'https://picsum.photos/50'} 
        alt="Replier" 
        className="rounded-circle me-3"
        width="50"
        height="50"
      />
      <div className="flex-grow-1">
        <h6>{content?.getIn(['user', 'name']) || 'Anonymous'}</h6>
        <p className="text-muted">{content ? formatDate(content.get('updatedAt')) : ''}</p>
        <div dangerouslySetInnerHTML={{ __html: content?.get('body') || '' }} />
      </div>
      <div className="d-flex flex-column align-items-center ms-3">
        <button 
          type="button" 
          className={`btn btn-outline-${upvoted ? 'dark' : 'secondary'}`}
          onClick={() => setUpvoted(!upvoted)}
        >
          {content?.get('upvotes') || 0}
          <CircleArrowUp />
        </button>
        <button type="button" className="btn btn-light mt-2">
          <EllipsisVertical />
        </button>
      </div>
    </div>


  );
}