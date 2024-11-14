import React from 'react';
import { Minus, Dot } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function AnnouncementHeader({ content }) {
  const announcementBody = content.get('body');
  return (
    <div className="announcement-header mb-3">
      <div className="d-flex align-items-center mb-2">
        <img
          src={content.getIn(['user', 'pictureThumbnail'])}
          alt="Announcer"
          className="rounded-circle me-3"
          width="50"
          height="50"
        />
        <div>
          <p className="mb-0">
            <strong>{content.getIn(['user', 'name'])}</strong> <Minus />{' '}
            {content.get('role') || 'Instructor'}
          </p>
          <p className="text-muted mb-0">
            Posted an announcement <Dot /> {formatDate(content.get('updatedAt'))}
          </p>
        </div>
      </div>
      <div className='mt-2 p-3'>
        <h5 className='fs-4'>{content.get('title')}</h5>
        <div
          className="announcement-body mt-2 txt2 fs-6"
          dangerouslySetInnerHTML={{
            __html: announcementBody,
          }}
        />
      </div>
    </div>
  );
}