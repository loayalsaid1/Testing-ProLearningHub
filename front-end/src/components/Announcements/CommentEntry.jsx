import React from 'react';
import { Dot } from 'lucide-react';
import {formatDate} from '../../utils/utilFunctions';

export default function CommentEntry({ content }) {
  const date = formatDate(content.get('updatedAt'));

  return (
    <div data-id={content.get('id')}>
      <img src={content.getIn(['user', 'pictureThumbnail'])} alt="user" />
      <div>
        <p>
          {content.getIn(['user', 'name'])} <Dot /> {date}
        </p>
        <p>{content.get('body')}</p>
      </div>
    </div>
  );
}
