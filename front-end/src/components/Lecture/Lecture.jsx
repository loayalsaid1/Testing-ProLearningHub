import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extractVideoId } from '../../utils/utilFunctions';
import { getLectureById } from '../../redux/actions/lecturesThunks';

/**
 * Next there must be away to keep the data in sync..
 * may be just long polling.. or here setting a typestamp for when was last
 * time fetch and with intervals.. check if data changed..
 * or something outside the scope of redux.. which is utilizing websotckets
 * to ping react when a change happens
 */
export default function Lecture({ lectureId }) {
  const lectureData = useSelector((state) =>
    state.lectures.getIn(['lectures', lectureId])
  );
  const dispatch = useDispatch();
  
  useEffect(() => {
    dispatch(getLectureById(lectureId));
  }, [dispatch, lectureId, lectureData]);
  
  const videoId = extractVideoId(lectureData.get('videoLink'));
  const demos = lectureData
    .get('demos')
    .map((demo, index) => (
      <li key={index}>
        <a href={demo.url}>{demo.title}</a>
      </li>
    ))
    .toJS();
  const shorts = lectureData
    .get('shorts')
    .map((short, index) => (
      <li key={index}>
        <a href={short.url}>{short.title}</a>
      </li>
    ))
    .toJS();
  const quizzez = lectureData
    .get('quizzez')
    .map((quizzez, index) => (
      <li key={index}>
        <a href={quizzez.url}>{quizzez.title}</a>
      </li>
    ))
    .toJS();

  return (
    <>
      <h1>{lectureData.title}</h1>
      <p>{lectureData.description}</p>
      <iframe src={`https://www.youtube.com/embed/${videoId}`}></iframe>

      <details>
        <summary>Lecture</summary>
        <ul>
          <li>
            <a href={lectureData.get('audioLink')}>Audio</a>
          </li>
          <li>
            <a href={lectureData.get('Notes')}>Notes</a>
          </li>
          //{' '}
          <li>
            <a href={lectureData.get('')}>Video</a>
          </li>
          <li>
            <a href={lectureData.get('slides')}>Slides</a>
          </li>
          <details>
            <summary>Demos</summary>
            {demos.length === 0 ? <p>No Demos</p> : <ol>{demos}</ol>}
          </details>
          <li>
            <a>transcript</a>
          </li>
          <li>
            <a>subtitles</a>
          </li>
        </ul>
      </details>
      <details>
        <summary>Shorts & Extras</summary>
        {shorts.length === 0 ? <p>No Shorts</p> : <ol>{shorts}</ol>}
      </details>
      <details>
        <summary>Quizzez & Problem Set</summary>
        {quizzez.length === 0 ? <p>No Quizzez</p> : <ol>{quizzez}</ol>}
      </details>
    </>
  );
}