import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { CircleArrowUp, Dot, EllipsisVertical } from 'lucide-react';
import { fromJS } from 'immutable';
import ReplyEntry from './ReplyEntry';
import TextEditor from '../TextEditor/TextEditor';
import { replaceTempImageUrls } from '../../utils/utilFunctions';
import { toggleLoading } from '../../redux/actions/uiActionCreators';

export default function Replies() {
  const [showReplyEditor, setShowReplyEditor] = useState(false);
  const [reply, setReply] = useState('');
  const [replyFiles, setReplyFiles] = useState([]);
  const dispatch = useDispatch();

  const handleSubmission = async () => {
    try {
      dispatch(toggleLoading());
      const newContent = await replaceTempImageUrls(reply);
      console.log(newContent);
    } catch (error) {
      console.error(error);
      dispatch(setError('discussion', 'Failed to submit reply.'));
    } finally {
      setShowReplyEditor(false);
      dispatch(toggleLoading());
    }
  };

  return (
    <>
      {/* Back button */}
      <button type="button">Back to all questions</button>

      {/* Question part */}
      <div>
        <img
          src="https://picsum.photos/50"
          width="50"
          height="50"
          alt="Questioner"
        />
      </div>
      <div>
        <h3>Question title</h3>
        <p>
          Questioner Name <Dot /> X days ago
        </p>
        <div>Question Text</div>
      </div>
      <div>
        <button type="button">
          12 <CircleArrowUp />
        </button>
        <button type="button">
          <EllipsisVertical />
        </button>
      </div>

      {/* Replies part */}
      <div>
        <p>
          {mockReplies.size} repl{mockReplies.size !== 1 ? 'ies' : 'y'}
        </p>
        {/* Replie entry */}
        <div>
          {mockReplies.map((reply) => (
            <ReplyEntry key={reply.get('id')} content={reply} />
          ))}
        </div>
      </div>

      {/* Reply section */}
      {!showReplyEditor ? (
        <div>
          <img
            src="https://picsum.photos/50"
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
  );
}

const question = fromJS({
  id: 'question-1',
  title: 'How does react hooks work?',
  user: {
    name: 'John Doe',
    pictureThumbnail: 'https://picsum.photos/100',
  },
  updatedAt: '2022-01-01T00:00:00.000Z',
  upvotes: 100,
  upvoted: false,
  repliesCount: 20,
});

const mockReplies = fromJS([
  {
    id: 'reply-1',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2024-11-02T07:00:00.000Z',
    upvotes: 50,
    upvoted: true,
    body: 'How does react hooks work?',
  },
  {
    id: 'reply-2',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2022-01-03T00:00:00.000Z',
    upvotes: 30,
    upvoted: false,
    body: 'How does react context work?',
  },
  {
    id: 'reply-3',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2024-11-04T07:00:00.000Z',
    upvotes: 20,
    upvoted: false,
    body: 'How does react hooks work?',
  },
]);
