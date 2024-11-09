import React from 'react';
import { Dot, CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';

export default function QuestionHeader({ question }) {
  return (
    <>
      <div>
        <img
          src={question.getIn(['user', 'pictureThumbnail'])}
          alt="Questioner"
        />
      </div>
      <div>
        <h3>{question.get('title')}</h3>
        <p>
          {question.getIn(['user', 'name'])} <Dot />{' '}
          {formatDate(question.get('updatedAt'))}
        </p>
        <div>{question.get('body')}</div>
      </div>
      <div>
        <button type="button">
          {question.get('upvotes')}{' '}
          <CircleArrowUp color="grey" strokeWidth={2} />
        </button>
        <button
          type="button"
          onClick={() =>
            console.log(question.get('id') + 'options')
          }
        >
          <EllipsisVertical />
        </button>
      </div>
    </>
  );
}
