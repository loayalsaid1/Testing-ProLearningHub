const express = require('express');
const ImageKit = require('imagekit');
const app = express();
const cors = require('cors');
const port = 3000;

app.use(express.json());
app.use(cors({origin: '*'}));
app.use((req, res, next) => {
  res.setHeader("Cross-Origin-Opener-Policy", "same-origin");
  res.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
  next();
});
app.post('/auth/login', (req, res) => {
	console.log(req.body);
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    res.send({ message: 'Logged in successfully', 
			user: {
				email, password, id: 'testId',
        role: 'student'

			}
		 });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});


app.post('/auth/oauth/google', (req, res) => {
  const idToken  = req.body.token;
  console.log(idToken)
  const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
  fetch(googleVerifyUrl)
    .then(response => response.json())
    .then(data => {
      if (data.email_verified) {
        res.send({ message: 'Logged in successfully', 
          user: {
            email: data.email,
            id: data.sub,
            role: 'student'

          }
        });
      } else {
        res.status(401).send({ message: 'Email not verified' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    });
});

app.post('/auth/oauth/googleRegister', (req, res) => {
  const idToken  = req.body.token;
  console.log(idToken)
  const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
  fetch(googleVerifyUrl)
    .then(response => response.json())
    .then(data => {
      console.log(data)
      if (data.email_verified) {
        res.send({ message: 'Logged in successfully', 
          user: {
            email: data.email,
            id: data.sub,

          }
        });
      } else {
        res.status(401).send({ message: 'Email not verified' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    });
});

app.post('/auth/admin/login', (req, res) => {
  const { email, password } = req.body;
  if (email === 'admin' && password === 'admin') {
    res.send({ message: 'Logged in successfully', 
      user: {
        email,
        password,
        id: 'testId',
        role: 'admin'
      }
    });
  } else {
    res.status(401).send({ message: 'Invalid credentials' });
  }
});

app.post('/auth/admin/OAuth/google', (req, res) => {
  const idToken  = req.body.token;
  const googleVerifyUrl = `https://oauth2.googleapis.com/tokeninfo?id_token=${idToken}`;
  fetch(googleVerifyUrl)
    .then(response => response.json())
    .then(data => {
      if (data.email_verified) {
        res.send({ message: 'Logged in successfully', 
          user: {
            email: data.email,
            id: data.sub,
            role: 'admin'
          }
        });
      } else {
        res.status(401).send({ message: 'Email not verified' });
      }
    })
    .catch(error => {
      console.error(error);
      res.status(500).send({ message: 'Internal Server Error' });
    });
});

const imagekit = new ImageKit({
  publicKey: 'public_tTc9vCi5O7L8WVAQquK6vQWNx08=',
  privateKey: 'private_edl1a45K3hzSaAhroLRPpspVRqM=',
  urlEndpoint: 'https://ik.imagekit.io/loayalsaid1/proLearningHub'
});

app.get('/auth/imagekit', (req, res) => {
  const authenticationParameters = imagekit.getAuthenticationParameters();
  res.json(authenticationParameters);
});

app.post('/auth/register', (req, res) => {
  const { userData } = req.body;
  console.log(userData);
  const { email, firstName, lastName, userName, pictureId, pictureURL, id = 'fakeId' } = userData;

    res.status(201).json({
      user: {email, firstName, lastName, userName, pictureId, pictureURL, id},
      message: 'Email is already used, Please try another one or login',
    });
});

app.get('/courses/:courseId/lectures/:lectureId', (req, res) => {
  const courseId = req.params.courseId;
  const lectureId = req.params.lectureId;
  console.log(courseId, lectureId)
  const allowedLectures = mockSections.flatMap(section => section.lectures.map(lecture => lecture.id));
  if (courseId === "testId" && allowedLectures.includes(lectureId)) {
    res.json({lectureData: {
      id: lectureId,
      title: 'Week 4',
      videoLink: 'https://youtu.be/F9-yqoS7b8w',
      notes: 'https://example.com/lecture-notes',
      audioLink: 'https://cs50.harvard.edu/college/2022/spring/lectures/4/wav/lecture4.wav',
      slides: 'https://cs50.harvard.edu/college/2022/spring/lectures/4/slides/lecture4.pdf',
      subtitles: 'https://cs50.harvard.edu/college/2022/spring/lectures/4/subtitles/lecture4.srt',
      transcript: 'https://cs50.harvard.edu/college/2022/spring/lectures/4/transcript',
      description: 'HTML, CSS, JavaScript',
      demos: [
        {
          title: 'Demo: HTML/CSS',
          url: 'https://youtu.be/nM0x2vV6uG8?t=1019'
        },
        {
          title: 'Demo: JavaScript',
          url: 'https://youtu.be/nM0x2vV6uG8?t=1749'
        }
      ],
      shorts: [
        {
          title: 'Short: HTML/CSS',
          url: 'https://youtu.be/nM0x2vV6uG8?t=1273'
        },
        {
          title: 'Short: JavaScript',
          url: 'https://youtu.be/nM0x2vV6uG8?t=1993'
        }
      ],
      quizzez: [
        {
          title: 'Problem Set 4',
          url: 'https://cs50.harvard.edu/college/2022/spring/psets/4/'
        }
      ]
    }});
  } else if (courseId === "testId") {
    res.status(404).send({ message: 'Lecture not found' });
  } else {
    res.status(404).send({ message: 'Course not found' });
  }
});


app.get('/courses/:id/lectures', (req, res) => {
  const courseId = req.params.id;
  console.log(courseId);
  if (courseId === "testId") {
    res.json({sections: mockSections});
  } else {
    res.status(404).send({ message: 'Course not found' });
  }
});

app.get('/lectures/:id/discussion', (req, res) => {
  console.log(33)
  const id = req.params.id;
  const allowedLectures = mockSections.flatMap(section => section.lectures.map(lecture => lecture.id));

  if (allowedLectures.includes(id)) {
    res.json(mockDiscussion);
  } else {
    res.status(404).send({ message: 'Lecture not found' });
  }
});

app.post('/lectures/:id/discussion', (req, res) => {
  const lectureId = req.params.id;
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const newEntry = {
    id: `entry-${Date.now()}`,
    title,
    user: {
      name: 'John Doe',
      pictureThumbnail: `https://picsum.photos/200/${Math.floor(Math.random() * 100) + 300}`,
    },
    updatedAt: new Date().toISOString(),
    upvotes: 0,
    upvoted: false,
    repliesCount: 0,
  };

  // Here you would typically add the newEntry to your database or data store.
  // For this example, we'll just return it in the response.
  mockDiscussion.unshift(newEntry);
  
  
  res.status(201).json(newEntry);
});

app.get('/courses/:id/general_discussion', (req, res) => {
  const id = req.params.id;
  if (id === "testId") {
    res.json(mockDiscussion);
  } else {
    res.status(404).send({ message: 'Course not found' });
  }
});

app.post('/courses/:id/general_discussion', (req, res) => {
  const courseId = req.params.id;
  const { userId, title, body } = req.body;

  if (!userId || !title || !body) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const newEntry = {
    id: `entry-${Date.now()}`,
    title,
    user: {
      name: 'John Doe',
      pictureThumbnail: `https://picsum.photos/200/${Math.floor(Math.random() * 100) + 300}`,
    },
    updatedAt: new Date().toISOString(),
    upvotes: 0,
    upvoted: false,
    repliesCount: 0,
  };

  // Here you would typically add the newEntry to your database or data store.
  // For this example, we'll just return it in the response.
  mockDiscussion.push(newEntry);
  
  res.status(201).json(newEntry);
});

app.get('/questions/:id/replies', (req, res) => {
  const questionId = req.params.id;

  // Mock question data
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

  // Mock replies data
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

  if (questionId === 'question-1') {
    res.json({ question, repliesList });
  } else {
    res.status(404).send({ message: 'Question not found' });
  }
});

app.post('/questions/:id/replies', (req, res) => {
  const questionId = req.params.id;
  const { userId, body } = req.body;

  if (!userId || !body) {
    return res.status(400).send({ message: 'Missing required fields' });
  }

  const newReply = {
    questionId,
    id: `reply-${Date.now()}`,
    user: {
      name: 'Anonymous',
      pictureThumbnail: `https://picsum.photos/100`,
    },
    updatedAt: new Date().toISOString(),
    upvotes: 0,
    upvoted: false,
    body,
  };

  // Here you would typically add the newReply to your database or data store.
  // For this example, we'll just return it in the response.
  mockReplies.unshift(newReply);

  res.status(201).json(newReply);
});

app.get('/courses/:id/announcements', (req, res) => {
  const courseId = req.params.id;

  // Mock announcements data


  if (courseId === "testId") {
    res.json(mockAnnouncements);
  } else {
    res.status(404).send({ message: 'Course not found' });
  }
});
app.get('/announcements/:id/comments', (req, res) => {
  const announcementId = req.params.id;
  const ids = mockAnnouncements.map((announcement) => announcement.id);
  ids.push('testId');
  if (ids.includes(announcementId)) {
    res.json(mockComments);
  } else {
    res.status(404).send({ message: 'Announcement not found' });
  }
});

app.post('/announcements/:id/comments', (req, res) => {
  const announcementId = req.params.id;
  const { userId, comment } = req.body;

  if (!userId || !comment) {
    return res.status(400).send({ message: 'Missing required fields' });
  }
  console.log(comment)
  const newComment = {
    announcementId,
    id: `comment-${Date.now()}`,
    user: {
      name: 'Anonymous',
      pictureThumbnail: `https://picsum.photos/100`,
    },
    updatedAt: new Date().toISOString(),
    body: comment,
  };

  // Here you would typically add the newComment to your database or data store.
  // For this example, we'll just return it in the response.
  mockComments.unshift(newComment);

  res.status(201).json(newComment);
});
app.use((req, res, next) => {
  res.status(404).send({ message: 'Not found' });
});

app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});


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

const mockDiscussion = [
  {
    id: 'question-1',
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
    id: 'question-2',
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
    id: 'question-3',
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
    id: 'question-4',
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
