import React from 'react';
import { extractVideoId } from '../../utils/utilFunctions';

export default function Lecture({ lectureId }) {
  const videoId = extractVideoId('https://youtu.be/F9-yqoS7b8w');
  return (
    <>
      <h1>Week 4 Memory
      </h1>
      <p>
      Pointers. Segmentation Faults. Dynamic Memory Allocation. Stack. Heap. Buffer Overflow. File I/O. Images.

{' '}
      </p>
      <iframe
        width="800px"
        height="500px"
        src={`https://www.youtube.com/embed/${videoId}`}
      ></iframe>

      <details>
        <summary>Lecture</summary>
        <ul>
          <li><a>Audio</a></li>
          <li><a>Notes</a></li>
          <li><a>Video</a></li>
          <li><a>Slides</a></li>
          <details>
            <summary>Demos</summary>
            <ol>
              <li><a>Demo 1</a></li>
              <li><a>Demo 2</a></li>
              <li><a>Demo 3</a></li>
            </ol>
          </details>
          <li><a>transcript</a></li>
          <li><a>subtitles</a></li>
        </ul>
      </details>
      <details>
        <summary>Shorts & Extras</summary>
        <ol>
          <li><a>Hexadecimal</a></li>
          <li><a>Pointers</a></li>
          <li><a>Defining Custom Types</a></li>
          <li><a>Dynamic Memory Allocation</a></li>
          <li><a>Call Stacks</a></li>
          <li><a>File Pointers</a></li>
        </ol>
      </details>
      <details>
        <summary>Quizzez & Problem Set</summary>
        <ol>
          <li><a>Lab 1</a></li>
          <li><a>Lab 2</a></li>
          <li><a>Lectur Problemset</a></li>
        </ol>
      </details>
    </>
  );
}
