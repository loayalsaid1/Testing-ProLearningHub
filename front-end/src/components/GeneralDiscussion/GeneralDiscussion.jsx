import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Loading from '../utilityComponents/Loading';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from '../DiscussionEntries/DiscussionEntryEditor';
import DiscussionEntries from '../DiscussionEntries/DiscussionEntries';
import { addGeneralDiscussionEntry, getGeneralDiscussion } from '../../redux/actions/discussionsThunks';
import {
  selectCourseGeneralDiscussion,
  selectDiscussionsIsLoading,
} from '../../redux/selectors/DiscussionsSelectors';


export default function LectureDiscussion() {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const isLoading = useSelector(selectDiscussionsIsLoading);
	const entries = useSelector(selectCourseGeneralDiscussion);
  const dispatch = useDispatch();

  useEffect(() => {
    // This is not completely right. as still the logic to force reload or by real time pinging
    // when data changes .. considering Offline or PWA use for example with saving the state.
    // if (!entries || !entries.size) dispatch(addGeneralDiscussion);
    dispatch(getGeneralDiscussion());
  }, [dispatch]);

  const handlePublishQuestion = (title, details) => {
		console.log(title)
		console.log(details);
    dispatch(addGeneralDiscussionEntry(title, details));
    setAskNewQuestion(false);
  };

  return (
    <div>
      <h2>General Discussion</h2>
			<p>Course Disucsison forum or whatever text fits here</p>
      <SearchField placeholder="Search general course questions" />
      {isLoading ? (
        <Loading />
      ) : (
        <DiscussionEntries entries={entries} chunkSize={15} />
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
