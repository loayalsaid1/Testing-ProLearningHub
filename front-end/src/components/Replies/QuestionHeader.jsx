import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dot, CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import {
  makeRepliesQuestionUpvotesSelector,
  makeRepliesQuestionIsUpvotedSelector,
} from '../../redux/selectors/DiscussionsSelectors';
import { toggleQuestionVote } from '../../redux/actions/discussionsThunks';


export default function QuestionHeader({ question, isLecture }) {
  const upvoted = useSelector(makeRepliesQuestionIsUpvotedSelector(question.get('id')));
  const upvotes = useSelector(makeRepliesQuestionUpvotesSelector(question.get('id')));

  console.log(upvoted, upvotes);
  const date = formatDate(question.get('updatedAt'));

  const dispatch = useDispatch();
  const toggleUpvote = () => {
    dispatch(toggleQuestionVote(question.get('id')));
  };

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
        <button type="button" onClick={toggleUpvote}>
          {upvotes}{' '}
          {!upvoted ? (
            <CircleArrowUp color="grey" strokeWidth={2} />
          ) : (
            <CircleArrowUp color="black" strokeWidth={2.2} />
          )}
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
