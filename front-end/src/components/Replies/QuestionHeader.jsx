import React from 'react';
import { Dot, CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function QuestionHeader({ question }) {
  return (
    <div className="d-flex align-items-start p-3 border rounded mb-3">
      <img
        src={question.getIn(['user', 'pictureThumbnail'])}
        alt="Questioner"
        className="rounded-circle me-3"
        width="50"
        height="50"
      />
      <div className="flex-grow-1">
        <h5 className="mb-1">{question.get('title')}</h5>
        <p className="text-muted mb-1">
          {question.getIn(['user', 'name'])} <Dot />{' '}
          {formatDate(question.get('updatedAt'))}
        </p>
        <p>{question.get('body')}</p>
      </div>
      <div className="text-end">
        <button className="btn btn-light">
          {question.get('upvotes')} <CircleArrowUp />
        </button>
        <button className="btn btn-light">
          <EllipsisVertical />
        </button>
      </div>
    </div>

  );
}
