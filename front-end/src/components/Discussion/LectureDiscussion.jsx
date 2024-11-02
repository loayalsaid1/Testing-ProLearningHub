import React, { useState } from 'react';
import { fromJS } from 'immutable';
import SearchField from '../sharedComponents/SearchField';
import DiscussionEntryEditor from './DiscussionEntryEditor';
import DiscussionEntry from './DiscussionEntry';

export default function LectureDiscussion({ lectureId = '' }) {
  const [askNewQuestion, setAskNewQuestion] = useState(false);
  const [limit, setLimit] = useState(10);

  if (!lectureId)
    return <p>Am I hijacked? Where Am I rendered... no lectureID givin</p>;

  const handlePublishQuestion = (title, details) => {
    console.log('title => ', title)
    console.log('details with the real file urls =>  ', details)
    setAskNewQuestion(false);
  }

  const entries = mockLectureDiscussionEntries;
  return (
    <div>
      <h2>Lecture Discussion</h2>
      <SearchField placeholder="Search lecture questions" />
      <div>
        {
          entries.slice(0, limit).map(entry => {
            return <DiscussionEntry key={entry.id} content={entry} />
          })
        }
      </div>
      {/* Depeneding on there is more or not */}
      {/* It's a mistaeke to not do pagenation in teh backend for now.*/}
      {entries.size > 10 && entries.size >= limit && <button type="button" onClick={() => setLimit(limit + 10)}>See more</button>}
      {limit > 10 && <button type="button" onClick={() => setLimit(limit - 10)}>See less</button>}
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


/**
 * lectureDiscussionEntryies
 * [
	{
		user: { pictureThubmnail, name}
		updateDate / creation data .....  or updatedAt
		title
		upvotes [number]
    upvoted [boolean]
		repliesCount [number]
		id ........ of couse.. incase i forgot it in any previous reponses.. it must be there for everything
	}
	...
]
 */

const mockLectureDiscussionEntries = fromJS([
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
]);
