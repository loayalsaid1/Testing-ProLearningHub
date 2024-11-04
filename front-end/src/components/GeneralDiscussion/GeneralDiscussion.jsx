import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import Loading from '../utilityComponents/Loading';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from '../DiscussionEntries/DiscussionEntryEditor';
import DiscussionEntries from '../DiscussionEntries/DiscussionEntries';
import {
  selectDiscussionsIsLoading,
} from '../../redux/selectors/DiscussionsSelectors';

import {fromJS} from 'immutable';

export default function LectureDiscussion() {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const isLoading = useSelector(selectDiscussionsIsLoading);
	const entries = mockDiscussion;
  
  const handlePublishQuestion = (title, details) => {
		console.log(title)
		console.log(details);
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


const mockDiscussion = fromJS([
  {
    id: '1',
    title: 'How does react work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/300',
    },
    updatedAt: '2022-01-01T00:00:00.000Z',
    upvotes: 100,
    upvoted: false,
    repliesCount: 20,
  },
  {
    id: '2',
    title: 'How does react state work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/301',
    },
    updatedAt: '2024-11-02T07:00:00.000Z',
    upvotes: 50,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '3',
    title: 'How does react context work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/302',
    },
    updatedAt: '2022-01-03T00:00:00.000Z',
    upvotes: 30,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '4',
    title: 'How does react hooks work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/303',
    },
    updatedAt: '2024-11-04T07:00:00.000Z',
    upvotes: 20,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '5',
    title: 'What is the difference between react and angular?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/304',
    },
    updatedAt: '2022-01-05T00:00:00.000Z',
    upvotes: 15,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '6',
    title: 'How does react router work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/305',
    },
    updatedAt: '2024-11-06T07:00:00.000Z',
    upvotes: 10,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '7',
    title: 'How does react context work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/306',
    },
    updatedAt: '2022-01-07T00:00:00.000Z',
    upvotes: 5,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '8',
    title: 'How does react useState work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/307',
    },
    updatedAt: '2024-11-08T07:00:00.000Z',
    upvotes: 15,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '9',
    title: 'How does react useEffect work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/308',
    },
    updatedAt: '2022-01-09T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '10',
    title: 'How does react useRef work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/309',
    },
    updatedAt: '2024-11-10T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '11',
    title: 'How does react useLayoutEffect work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/310',
    },
    updatedAt: '2022-01-11T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '12',
    title: 'How does react useMemo work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/311',
    },
    updatedAt: '2024-11-12T07:00:00.000Z',
    upvotes: 15,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '13',
    title: 'How does react useCallback work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/312',
    },
    updatedAt: '2022-01-13T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '14',
    title: 'How does react useReducer work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/313',
    },
    updatedAt: '2024-11-14T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '15',
    title: 'How does react useContext work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/314',
    },
    updatedAt: '2022-01-15T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '16',
    title: 'How does react useImperativeHandle work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/315',
    },
    updatedAt: '2024-11-16T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '17',
    title: 'How does react useLayoutEffect work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/316',
    },
    updatedAt: '2022-01-17T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '18',
    title: 'How does react useRef work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/317',
    },
    updatedAt: '2024-11-18T07:00:00.000Z',
    upvotes: 15,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '19',
    title: 'How does react useMemo work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/318',
    },
    updatedAt: '2022-01-19T00:00:00.000Z',
    upvotes: 5,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '20',
    title: 'How does react useCallback work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/319',
    },
    updatedAt: '2024-11-20T07:00:00.000Z',
    upvotes: 10,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '21',
    title: 'How does react useLayoutEffect work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/320',
    },
    updatedAt: '2022-01-21T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '22',
    title: 'How does react useMemo work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/321',
    },
    updatedAt: '2024-11-22T07:00:00.000Z',
    upvotes: 15,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '23',
    title: 'How does react useCallback work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/322',
    },
    updatedAt: '2022-01-23T00:00:00.000Z',
    upvotes: 5,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '24',
    title: 'How does react useEffect work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/323',
    },
    updatedAt: '2024-11-24T07:00:00.000Z',
    upvotes: 10,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '25',
    title: 'How does react useState work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/324',
    },
    updatedAt: '2022-01-25T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '26',
    title: 'How does react useReducer work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/325',
    },
    updatedAt: '2024-11-26T07:00:00.000Z',
    upvotes: 15,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '27',
    title: 'How does react context work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/326',
    },
    updatedAt: '2022-01-27T00:00:00.000Z',
    upvotes: 5,
    upvoted: true,
    repliesCount: 10,
  },
  {
    id: '28',
    title: 'How does react router work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/327',
    },
    updatedAt: '2024-11-28T07:00:00.000Z',
    upvotes: 10,
    upvoted: false,
    repliesCount: 5,
  },
  {
    id: '29',
    title: 'How does react hooks work?',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/200/328',
    },
    updatedAt: '2022-01-29T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    repliesCount: 10,
  },
]);
