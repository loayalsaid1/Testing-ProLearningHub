import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utilityComponents/Loading';
import TextEditor from '../TextEditor/TextEditor';
import { replaceTempImageUrls } from '../../utils/utilFunctions';
import { setError, toggleLoading } from '../../redux/actions/uiActionCreators';
import { addDiscussionReply, fetchReplies } from '../../redux/actions/discussionsThunks';
import {
  selectDiscussionsIsLoading,
  makeRepliesSelector,
} from '../../redux/selectors/DiscussionsSelectors';
import QuestionHeader from './QuestionHeader';
import RepliesList from './RepliesList';
import { Link, useParams } from 'react-router-dom';
export default function Replies() {
  const { questionId } = useParams();
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [reply, setReply] = useState('');
  const [replyFiles, setReplyFiles] = useState([]);
  const repliesIsLoading = useSelector(selectDiscussionsIsLoading);
  const repliesSelector = makeRepliesSelector(questionId);
  const replies = useSelector(repliesSelector);
  const dispatch = useDispatch();
  const userPicture = useSelector((state) =>
    state.ui.getIn(['user', 'picture'])
  );

  useEffect(() => {
    // again... pass the logic of offline experience and also
    // real time pinging if new reply addid
      dispatch(fetchReplies(questionId));
  }, [dispatch, questionId]);

  const handleSubmission = async () => {
    try {
      dispatch(toggleLoading());
      const newContent = await replaceTempImageUrls(reply, replyFiles, dispatch);

      dispatch(addDiscussionReply(questionId, newContent, replyFiles));
    } catch (error) {
      console.error(error);
      dispatch(setError('discussion', 'Failed to submit reply.'));
    } finally {
      setShowReplyEditor(false);
      setReply('');
      dispatch(toggleLoading());
    }
  };

  return (
    <>
    {/* Now, I'll be a dectateo and make him only go to discusssiosn.
    because honestly.. I don'tknow how to findout he was comming from genreal questions
    or from a specific lecture with an id... OR.. FROM OUTSIDE OF THE APP!,
    SO, NAVIGATE(-1) WON'T WORK HERE...
    so.. Let me just go back to the discussion page and that's it
    i'm really really really running out of time here. and no time for my perfectionism..

    It would be very imparasing if I actually find out later that's a very simple problem!
    */}
      <button type="button"><Link to="/discussion">Back to all questions</Link></button>
      {repliesIsLoading ? (
        <Loading />
      ) : !replies || !replies.get('repliesList')?.size === 0 ? (
        <h1>No replies</h1>
      ) : (
        <>
          <QuestionHeader question={replies.get('question')} />
          <RepliesList replies={replies.get('repliesList')} />
          {!showReplyEditor ? (
            <div>
              <img
                src={userPicture || 'https://picsum.photos/50'}
                width="50"
                height="50"
                alt="user"
              />
              <input
                type="text"
                id="reply"
                name="reply"
                placeholder="Add your comment here..."
                onClick={() => setShowReplyEditor(true)}
              />
            </div>
          ) : (
            <>
              <p>Write your response</p>
              <TextEditor
                placeholder="Write your response here..."
                value={reply}
                setValue={setReply}
                files={replyFiles}
                setFiles={setReplyFiles}
              />
              <button type="button" onClick={handleSubmission}>
                Add an answer
              </button>
            </>
          )}
        </>
      )}
    </>
  );
}
