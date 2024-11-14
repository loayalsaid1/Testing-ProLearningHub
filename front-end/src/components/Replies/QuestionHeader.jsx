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
        <div dangerouslySetInnerHTML={{ __html: question.get('body') }}></div>
      </div>
      <div className="text-end">
        <button type="button" className="btn btn-light" onClick={toggleUpvote}>
          {upvotes}{' '}
          {!upvoted ? (
            <CircleArrowUp color="grey" strokeWidth={2} />
          ) : (
            <CircleArrowUp color="black" strokeWidth={2.2} />
          )}
        </button>
        <button className="btn btn-light">
          <EllipsisVertical />
        </button>
      </div>
    </div>

  );
}
