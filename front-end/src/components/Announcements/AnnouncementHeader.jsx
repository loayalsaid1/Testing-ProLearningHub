import React from 'react';
import { Minus, Dot } from 'lucide-react';
import {formatDate} from '../../utils/utilFunctions';

export default function AnnouncementHeader({ content }) {
  const announcementBody = content.get('body');
  return (
    <div>
      <div>
        <img src={content.getIn(['user', 'pictureThumbnail'])} alt="Announcer" />
        <p>
          <strong>{content.getIn(['user', 'name'])}</strong> <Minus />{' '}
          {/* Incase the role thing is not implemented yet in testing */}
          {content.get('role') || 'Instructor'}
        </p>
        <p>
          Posted an announcement <Dot /> {formatDate(content.get('updatedAt'))}
        </p>
      </div>

      <div>
        <h4>{content.get('title')}</h4>
        <div
          dangerouslySetInnerHTML={{
            __html: announcementBody,
          }}
        />
      </div>
    </div>
  );
}
