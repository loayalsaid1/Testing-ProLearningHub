import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utilityComponents/Loading';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from '../DiscussionEntries/DiscussionEntryEditor';
import DiscussionEntries from '../DiscussionEntries/DiscussionEntries';
import {
  getLectureDiscussions,
  addLectureDiscussionEntry,
} from '../../redux/actions/discussionsThunks';
import {
  selectDiscussionsIsLoading,
  makeLectureDiscussionsSelector,
} from '../../redux/selectors/DiscussionsSelectors';

export default function LectureDiscussion({ lectureId = '' }) {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const dispatch = useDispatch();
  const isLoading = useSelector(selectDiscussionsIsLoading);
  const entries = useSelector(makeLectureDiscussionsSelector(lectureId));

  useEffect(() => {
    // This is not completely right. as still the logic to force reload or by real time pinging
    // when data changes .. considering Offline or PWA use for example with saving the state.
    // if (!entries || !entries.size) dispatch(getLectureDiscussions(lectureId));
    dispatch(getLectureDiscussions(lectureId));
  }, [dispatch, lectureId]);

  if (!lectureId)
    return <p>Am I hijacked? Where Am I rendered... no lectureID givin</p>;

  const handlePublishQuestion = (title, details) => {
    dispatch(addLectureDiscussionEntry(lectureId, title, details));
    setAskNewQuestion(false);
  };

  return (
    <div>
      <h2>Lecture Discussion</h2>
      <SearchField placeholder="Search lecture questions" />
      {isLoading ? (
        <Loading />
      ) : (
        <DiscussionEntries entries={entries} chunkSize={10} isLecture />
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
