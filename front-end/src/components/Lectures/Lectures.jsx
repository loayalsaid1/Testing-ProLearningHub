import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectcourseSectionsJS,
  selectLecturesIsLoading,
} from '../../redux/selectors/lecturesSelectors';
import Loading from '../utilityComponents/Loading';
import Section from './Section';
import { getCourseLectures } from '../../redux/actions/lecturesThunks';
import SearchField from '../sharedComponents/SearchField';
import { Link } from 'react-router-dom'
import { CirclePlus } from 'lucide-react';

export default function Lectures() {
  const isLoading = useSelector(selectLecturesIsLoading);
  const sections = useSelector(selectcourseSectionsJS);
  const userRole = useSelector((state) => state.ui.getIn(['user', 'role']));
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
      <SearchField placeholder='Search the content of the course' />
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
      {
        userRole !== 'student'
        &&<button type='button'>
            <Link to='/lectures/new'>Add a lecture</Link>
          </button>
      }
    </>
  );
}
