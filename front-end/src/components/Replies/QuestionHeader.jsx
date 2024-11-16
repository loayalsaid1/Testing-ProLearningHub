import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dot, CircleArrowUp, EllipsisVertical, Trash2 } from 'lucide-react';
import { formatDate } from '../../utils/utilFunctions';
import {
  makeRepliesQuestionUpvotesSelector,
  makeRepliesQuestionIsUpvotedSelector,
} from '../../redux/selectors/DiscussionsSelectors';
import {
  selectUserRole,
  selectUserId
} from '../../redux/selectors/uiSelectors';
import { toggleQuestionVote } from '../../redux/actions/discussionsThunks';


export default function QuestionHeader({ question, isLecture }) {
  const upvoted = useSelector(makeRepliesQuestionIsUpvotedSelector(question.get('id')));
  const upvotes = useSelector(makeRepliesQuestionUpvotesSelector(question.get('id')));  
  const userRole = useSelector(selectUserRole);
  const userId = useSelector(selectUserId);
  const date = formatDate(question.get('updatedAt'));
  const [showOptions, setShowOptions] = useState(false);
  const dispatch = useDispatch();

  
  const deleteQuestion = () => {
    setShowOptions(false);
    if (window.confirm(`Are you sure you are deleting question ${question.get('id')}`)) {
      // dispatch(deleteQuestion(question.get('id'), isLecture));
      console.log(question.get('id'));
    }
  }

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
          {date}
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
        <button className="btn btn-light" onClick={() => setShowOptions(!showOptions)}>
          <EllipsisVertical />
        </button>

        {
          showOptions &&
          <div>          
          <ul>
            {
              (userRole !== 'student' || userId === question.getIn(['user', 'id'])) &&
              <li>
              <button type='button' onClick={deleteQuestion} >
                <Trash2 color='red' />
                Delete question
              </button>
            </li>
            }
          </ul>
        </div>
        }

      </div>
    </div>

  );
}
