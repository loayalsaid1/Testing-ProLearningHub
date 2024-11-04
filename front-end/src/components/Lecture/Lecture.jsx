import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { extractVideoId } from '../../utils/utilFunctions';
import { getLectureById } from '../../redux/actions/lecturesThunks';
import Loading from '../utilityComponents/Loading';
import LectureDiscussion from '../Discussion/LectureDiscussion';

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
  const isLoading = useSelector((state) => state.lectures.get('isLoading'));
  const dispatch = useDispatch();

  useEffect(() => {
    if (!lectureData) {
      dispatch(getLectureById(lectureId));
    }
  }, [dispatch, lectureData, lectureId]);

  const getVideoId = () => extractVideoId(lectureData.get('videoLink'));
  const getDemos = () =>
    lectureData
      .get('demos')
      .map((demo, index) => (
        <li key={index}>
          <a href={demo.get('url')}>{demo.get('title')}</a>
        </li>
      ))
      .toJS();
  const getShorts = () =>
    lectureData
      .get('shorts')
      .map((short, index) => (
        <li key={index}>
          <a href={short.get('url')}>{short.get('title')}</a>
        </li>
      ))
      .toJS();
  const getQuizzez = () =>
    lectureData
      .get('quizzez')
      .map((quizzez, index) => (
        <li key={index}>
          <a href={quizzez.get('url')}>{quizzez.get('title')}</a>
        </li>
      ))
      .toJS();

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : !lectureData ? (
        <h1>Lecture Not Found</h1>
      ) : (
        <>
          <h1>{lectureData.get('title')}</h1>
          <p>{lectureData.get('description')}</p>
          <iframe
            title={lectureData.get('title')}
            src={`https://www.youtube.com/embed/${getVideoId()}`}
          ></iframe>

          <details>
            <summary>Lecture</summary>
            <ul>
              <li>
                <a href={lectureData.get('audioLink')}>Audio</a>
              </li>
              <li>
                <a href={lectureData.get('notes')}>Notes</a>
              </li>
              {/* <li>
            <a href={lectureData.get('video')}>video</a>
          </li> */}
              <li>
                <a href={lectureData.get('slides')}>Slides</a>
              </li>
              <details>
                <summary>Demos</summary>
                {getDemos().length === 0 ? (
                  <p>No Demos</p>
                ) : (
                  <ol>{getDemos()}</ol>
                )}
              </details>
              <li>
                <a href={lectureData.get('transcript')}>transcript</a>
              </li>
              <li>
                <a href={lectureData.get('subtitles')}>subtitles</a>
              </li>
            </ul>
          </details>
          <details>
            <summary>Shorts & Extras</summary>
            {getShorts().length === 0 ? (
              <p>No Shorts</p>
            ) : (
              <ol>{getShorts()}</ol>
            )}
          </details>
          <details>
            <summary>Quizzez & Problem Set</summary>
            {getQuizzez().length === 0 ? (
              <p>No Quizzez</p>
            ) : (
              <ol>{getQuizzez()}</ol>
            )}
          </details>
          <LectureDiscussion lectureId={lectureId} />
        </>
      )}
    </>
  );
}
