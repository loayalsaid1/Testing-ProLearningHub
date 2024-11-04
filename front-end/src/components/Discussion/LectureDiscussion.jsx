import React, { useEffect, useState } from 'react';
import { fromJS } from 'immutable';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utilityComponents/Loading';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from './DiscussionEntryEditor';
import DiscussionEntry from './DiscussionEntry';
import { getLectureDiscussions } from '../../redux/actions/discussionsThunks';
import {
  selectDiscussionsIsLoading,
  makeLectureDiscussionsSelector,
} from '../../redux/selectors/DiscussionsSelectors';

export default function LectureDiscussion({ lectureId = '' }) {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const [limit, setLimit] = useState(10);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectDiscussionsIsLoading);
  const entries = useSelector(makeLectureDiscussionsSelector(lectureId));

  useEffect(() => {
    // This is not completely right. as still the logic to force reload or by real time pinging
    // when data changes .. considering Offline or PWA use for example with saving the state.
    if (!entries || !entries.size) dispatch(getLectureDiscussions(lectureId));
  }, [dispatch, entries, lectureId]);

  if (!lectureId)
    return <p>Am I hijacked? Where Am I rendered... no lectureID givin</p>;

  const handlePublishQuestion = (title, details) => {
    console.log('title => ', title);
    console.log('details with the real file urls =>  ', details);
    setAskNewQuestion(false);
  };

  return (
    <div>
      <h2>Lecture Discussion</h2>
      <SearchField placeholder="Search lecture questions" />
      {isLoading ? (
        <Loading />
      ) : !entries || !entries.size ? (
        <h2> No Discussion for this lecture</h2>
      ) : (
        <div>
          {entries.slice(0, limit).map((entry, index) => (
            <DiscussionEntry key={index} content={entry} />
          ))}
          {limit < entries.size && (
            <button type="button" onClick={() => setLimit(limit + 10)}>
              See more
            </button>
          )}
          {limit > 10 && (
            <button type="button" onClick={() => setLimit(limit - 10)}>
              See less
            </button>
          )}
        </div>
      )}
      <div>
        {askNewQuestion ? (
          <DiscussionEntryEditor onPublish={handlePublishQuestion} />
        ) : (
          // or a button?
          <p onClick={() => setAskNewQuestion(true)}>Ask a new question</p>
        )}
      </div>
    </div>
  );
}
