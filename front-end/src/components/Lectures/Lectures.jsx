import React from 'react';
import LectureEntry from './LectureEntry';
import Section from './Section';

export default function Lectures() {
  return (
    <>
      <h1>Lectures</h1>
      <p>
        Lectures or the course organized by Whatever criteria /time or chapters
        or topeic ?!
      </p>
      <div>
        <input
          type="search"
          placeholder="Search the content of the course"
          name="search"
          id="search"
        />
        <button type="button">
          <i>&#x1F50E;&#xFE0E;</i>
        </button>
      </div>
      {/* Sections */}
      <div>
				{mockSections.map(section => {
					return <section key={section.title} {...section} />
				})}
      </div>
    </>
  );
}

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
