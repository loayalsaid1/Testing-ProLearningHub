const mockComments = [
  {
    id: 'comment-1',
    announcementId: 'testId',
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
    announcementId: 'testId',
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
    announcementId: 'testId',
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
    announcementId: 'testId',
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
    announcementId: 'testId',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/104',
    },
    updatedAt: '2024-11-06T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    body: 'How does react useState work?',
  },
];

const mockAnnouncements = [
  {
    user: {
      name: 'John Doe',
      id: '1234567890',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    id: 'announcement-1',
    title: 'This is the title of the announcement',
    body: 'This is the content of the announcement',
    commentsCount: 10,
    updatedAt: '2022-01-01T00:00:00.000Z',
  },
  {
    user: {
      name: 'Jane Doe',
      id: '9876543210',
      pictureThumbnail: 'https://picsum.photos/101',
    },
    id: 'announcement-2',
    title: 'This is the title of the second announcement',
    body: 'This is the content of the second announcement',
    commentsCount: 5,
    updatedAt: '2024-11-01T00:00:00.000Z',
  },
];

const mockReplies = [
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
  {
    id: 'reply-4',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2022-01-05T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    body: 'How does react useState work?',
  },
  {
    id: 'reply-5',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2024-11-06T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    body: 'How does react useEffect work?',
  },
];

const question = {
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
};

const mockDiscussion = [
  {
    id: 'question-1',
    title: 'How does react work?',
    body: 'What is react and how does it work?',
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
    id: 'question-2',
    title: 'How does react state work?',
    body: 'What is react state and how does it work?',
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
    id: 'question-3',
    title: 'How does react context work?',
    body: 'What is react context and how does it work?',
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
    id: 'question-4',
    title: 'How does react hooks work?',
    body: 'What is react hooks and how does it work?',
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
    body: 'What is the difference between react and angular?',
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
    body: 'What is react router and how does it work?',
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
    body: 'What is react context and how does it work?',
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
    body: 'What is react useState and how does it work?',
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
    body: 'What is react useEffect and how does it work?',
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
    body: 'What is react useRef and how does it work?',
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
    body: 'What is react useLayoutEffect and how does it work?',
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
    body: 'What is react useMemo and how does it work?',
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
    body: 'What is react useCallback and how does it work?',
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
    body: 'What is react useReducer and how does it work?',
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
    body: 'What is react useContext and how does it work?',
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
    body: 'What is react useImperativeHandle and how does it work?',
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
    body: 'What is react useLayoutEffect and how does it work?',
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
    body: 'What is react useRef and how does it work?',
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
    body: 'What is react useMemo and how does it work?',
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
    body: 'What is react useCallback and how does it work?',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/200/319',
    },
    updatedAt: '2024-11-20T07:00:00.000Z',
    upvotes: 10,
    upvoted: false,
    repliesCount: 5,
  },
];

const mockSections = [
  {
    title: 'Low Level Programming',
    lectures: [
      {
        id: 'cs50-lecture-0',
        title: 'CS50 Lecture 0: Introduction',
        description:
          'This lecture covers the basics of computing and how the internet works',
        tags: ['basics', 'internet'],
      },
      {
        id: 'cs50-lecture-1',
        title: 'CS50 Lecture 1: C',
        description:
          'This lecture covers the basics of the C programming language',
        tags: ['c', 'programming'],
      },
      {
        id: 'cs50-lecture-2',
        title: 'CS50 Lecture 2: Arrays',
        description: 'This lecture covers the basics of arrays in C',
        tags: ['arrays', 'c'],
      },
    ],
  },
  {
    title: 'Data Structures and Algorithms',
    lectures: [
      {
        id: 'cs50-lecture-3',
        title: 'CS50 Lecture 3: Algorithms',
        description: 'This lecture covers the basics of algorithms',
        tags: ['algorithms', 'dsa'],
      },
      {
        id: 'cs50-lecture-4',
        title: 'CS50 Lecture 4: Searching, Sorting',
        description: 'This lecture covers searching and sorting algorithms',
        tags: ['searching', 'sorting', 'algorithms'],
      },
      {
        id: 'cs50-lecture-5',
        title: 'CS50 Lecture 5: Memory, Pointers',
        description: 'This lecture covers memory and pointers in C',
        tags: ['memory', 'pointers', 'c'],
      },
    ],
  },
  {
    title: 'High Level Programming',
    lectures: [
      {
        id: 'cs50-lecture-6',
        title: 'CS50 Lecture 6: Python',
        description:
          'This lecture covers the basics of the Python programming language',
        tags: ['python', 'programming'],
      },
      {
        id: 'cs50-lecture-7',
        title: 'CS50 Lecture 7: Object Oriented Programming',
        description:
          'This lecture covers object oriented programming in Python',
        tags: ['oop', 'python'],
      },
      {
        id: 'cs50-lecture-8',
        title: 'CS50 Lecture 8: File I/O',
        description: 'This lecture covers file input and output in Python',
        tags: ['file i/o', 'python'],
      },
    ],
  },
  {
    title: 'Frontend Development',
    lectures: [
      {
        id: 'cs50-lecture-9',
        title: 'CS50 Lecture 9: HTML, CSS',
        description: 'This lecture covers the basics of HTML and CSS',
        tags: ['html', 'css', 'frontend'],
      },
      {
        id: 'cs50-lecture-10',
        title: 'CS50 Lecture 10: JavaScript',
        description: 'This lecture covers the basics of JavaScript',
        tags: ['javascript', 'frontend'],
      },
      {
        id: 'cs50-lecture-11',
        title: 'CS50 Lecture 11: React',
        description: 'This lecture covers the basics of React',
        tags: ['react', 'frontend'],
      },
    ],
  },
  {
    title: 'Backend Development',
    lectures: [
      {
        id: 'cs50-lecture-12',
        title: 'CS50 Lecture 12: Flask',
        description: 'This lecture covers the basics of Flask',
        tags: ['flask', 'backend'],
      },
    ],
  },
];

const repliesList = [
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
  {
    id: 'reply-4',
    user: {
      name: 'John Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2022-01-05T00:00:00.000Z',
    upvotes: 10,
    upvoted: true,
    body: 'How does react useState work?',
  },
  {
    id: 'reply-5',
    user: {
      name: 'Jane Doe',
      pictureThumbnail: 'https://picsum.photos/100',
    },
    updatedAt: '2024-11-06T07:00:00.000Z',
    upvotes: 5,
    upvoted: false,
    body: 'How does react useEffect work?',
  },
];

module.exports = {
  mockComments,
  mockReplies,
  mockDiscussion,
  mockAnnouncements,
  question,
  repliesList
};
