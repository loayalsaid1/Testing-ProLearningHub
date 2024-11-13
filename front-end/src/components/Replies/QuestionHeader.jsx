import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dot, CircleArrowUp, EllipsisVertical } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import {
  makeGeneralQuestionIsUpvotedSelector,
  makeGeneralQuestionUpvotesSelector,
  makeLectureQuestionIsUpvotedSelector,
  makeLectureQuestionUpvotesSelector,
} from '../../redux/selectors/DiscussionsSelectors';
import { toggleDiscussionEntryVote } from '../../redux/actions/discussionsThunks';


export default function QuestionHeader({ question, isLecture }) {
  let upvoted;
  let upvotes;
  const lectureId = question.get('lectureId');
  console.log(lectureId);
  upvoted = useSelector(
    isLecture
      ? makeLectureQuestionIsUpvotedSelector(lectureId, question.get('id'))
      : makeGeneralQuestionIsUpvotedSelector(question.get('id'))
  );
  upvotes = useSelector(
    isLecture
      ? makeLectureQuestionUpvotesSelector(lectureId, question.get('id'))
      : makeGeneralQuestionUpvotesSelector(question.get('id'))
  );

  console.log(upvoted, upvotes);
  const date = formatDate(question.get('updatedAt'));

  const dispatch = useDispatch();
  const toggleUpvote = () => {
    dispatch(
      toggleDiscussionEntryVote(
        question.get('id'),
        isLecture,
        question.get('lectureId')
      ) || undefined
    );
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
