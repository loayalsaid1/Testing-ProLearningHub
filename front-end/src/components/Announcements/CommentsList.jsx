import React, { useState } from 'react';
import Loading from '../utilityComponents/Loading';

import { fromJS } from 'immutable';

export default function CommentsList({ announcementId }) {
  const [limit, setLimit] = useState(10);

  const [isLoading, setIsLoading] = useState(true);
  setTimeout(() => {
    setIsLoading(false);
  });

  return (
    <div>
      {isLoading ? (
        <Loading />
      ) : (
        mockComments
          .slice(0, limit)
          .map((comment) => (
            <CommentEntry key={comment.get('id')} content={comment} />
          ))
      )}
      {limit < mockComments.size && (
        <button type="button" onClick={() => setLimit(limit + 10)}>
          Show more
        </button>
      )}
      {limit > 10 && (
        <button type="button" onClick={() => setLimit(limit - 10)}>
          Show less
        </button>
      )}
    </div>
  );
}

const mockComments = fromJS([
  {
    id: 'comment-1',
    announcementId,
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2024-11-02T07:00:00.000Z',
    upvotes: 50,
    upvoted: true,
    body: 'How does react hooks work?',
  },
  {
    id: 'comment-2',
    announcementId,
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/101',
    },
    updatedAt: '2022-01-03T00:00:00.000Z',
    upvotes: 30,
    upvoted: false,
    body: 'How does react context work?',
  },
  {
    id: 'comment-3',
    announcementId,
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/102',
    },
    updatedAt: '2024-11-04T07:00:00.000Z',
    upvotes: 20,
    upvoted: false,
    body: 'How does react useState work?',
  },
  {
    id: 'comment-4',
    announcementId,
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/103',
    },
    updatedAt: '2022-01-05T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    body: 'How does react hooks work?',
  },
  {
    id: 'comment-5',
    announcementId,
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/104',
    },
    updatedAt: '2024-11-06T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    body: 'How does react useState work?',
  },
]);
