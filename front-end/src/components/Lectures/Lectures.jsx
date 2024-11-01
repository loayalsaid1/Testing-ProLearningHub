import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectcourseSectionsJS,
  selectLecturesIsLoading,
} from '../../redux/selectors/lecturesSelectors';
import Loading from '../utilityComponents/Loading';
import Section from './Section';
import { getCourseLectures } from '../../redux/actions/lecturesThunks';

export default function Lectures() {
  const isLoading = useSelector(selectLecturesIsLoading);
  const sections = useSelector(selectcourseSectionsJS);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getCourseLectures());
  }, [dispatch]);

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
      {isLoading ? (
        <Loading />
      ) : !sections.length ? (
        <p>No sections found</p>
      ) : (
        <div>
          {sections.map((section) => {
            return <Section key={section.title} {...section} />;
          })}
        </div>
      )}
    </>
  );
}
