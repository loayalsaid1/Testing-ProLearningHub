import React from 'react';
import { Dot } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function CommentEntry({ content }) {
  const date = formatDate(content.get('updatedAt'));

  return (
    <div className="d-flex align-items-start my-3 p-3 border rounded bg-light" data-id={content.get('id')}>
      {/* User Image */}
      <img
        src={content.getIn(['user', 'pictureThumbnail'])}
        alt="user"
        className="rounded-circle me-3"
        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
      />
      
      {/* Comment Content */}
      <div className="flex-grow-1">
        {/* User Name and Date */}
        <p className="mb-1 text-muted">
          <strong>{content.getIn(['user', 'name'])}</strong> <Dot /> {date}
        </p>
        
        {/* Comment Text */}
        <p className="mb-0">{content.get('body')}</p>
      </div>
    </div>
  );
}