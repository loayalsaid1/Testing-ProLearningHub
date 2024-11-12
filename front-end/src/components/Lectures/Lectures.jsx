import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectcourseSectionsJS,
  selectLecturesIsLoading,
} from '../../redux/selectors/lecturesSelectors';
import Loading from '../utilityComponents/Loading';
import { getCourseLectures } from '../../redux/actions/lecturesThunks';
import { Link } from 'react-router-dom';

export default function Lectures() {
  const isLoading = useSelector(selectLecturesIsLoading);
  const sections = useSelector(selectcourseSectionsJS);
  const dispatch = useDispatch();

  // State to handle the modal visibility and selected section data
  const [showModal, setShowModal] = useState(false);
  const [selectedSection, setSelectedSection] = useState(null);

  useEffect(() => {
    dispatch(getCourseLectures());
  }, [dispatch]);

  const handleShowModal = (section) => {
    setSelectedSection(section);
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  return (
    <>
      <div className="py-8 bg-light">
        <div className="container my-5">
          <div className="row mb-8 justify-content-center">
              <h1 className="text-center mb-4 fs-1 fw-bold mt-5">Lectures</h1>
              <p className="text-center mb-5 fs-4">
                Browse through the courses organized by time, chapters, or topic.
                Find everything you need to enhance your learning experience.
              </p>
            
              {/* Search Field */}
              <form className="d-flex mt-4 mb-5" role="search">
                <input className="form-control me-2 p-3" type="search" placeholder="Search the content of the course" aria-label="Search"/>
                <button className="btn btn-primary" type="submit">Search</button>
              </form>
          </div>

          <div className="row">
            {isLoading ? (
              <div className="d-flex justify-content-center">
                <Loading />
              </div>
            ) : !sections.length ? (
              <p className="text-center">No sections found</p>
            ) : (
              sections.map((section) => (
                <div className="col-lg-6 col-md-12 col-12" key={section.title}>
                  <div className="card mb-4">
                    <div className="card-body">
                      <div className="d-md-flex mb-4">
                        <div className="ms-md-4">
                          <h2 className="fs-5 mb-3">{section.title}</h2>
                          <p className="fs-6 fw-semibold mb-0 text-uppercase d-flex">
                            <span className="text-dark btn btn-warning">Courses - 1</span>
                            <span className="ms-3 btn btn-primary">3 Lessons</span>
                            <span className="ms-3 btn btn-success">1 Hour 15 Min</span>
                          </p>
                        </div>
                      </div>
                      <p className="mb-4 fs-5 p-3">
                        {section.description || 'No description available for this course.'}
                      </p>
                      <button
                        className="btn-link p-3"
                        onClick={() => handleShowModal(section)}
                      >
                        View Chapter Details
                      </button>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>

      {/* Modal Structure */}
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        aria-labelledby="courseModalLabel"
        aria-hidden={!showModal}
        style={{ display: showModal ? 'block' : 'none' }} // Modal visibility based on state
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="courseModalLabel">
                Course Chapter Details
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <h2 className='p-2'>{selectedSection?.title}</h2>
              <p className="lead mb-2 p-2">
                {selectedSection?.description || 'No description available for this course.'}
              </p>

              <div className="list-group">
                {selectedSection?.lectures.map((lecture) => (
                  <div
                    key={lecture.id}
                    className="list-group-item d-flex justify-content-between align-items-center"
                  >
                    <div className="d-flex align-items-start">
                      <i className="fa fa-play p-2"></i>
                      <div>
                        <Link
                          to={`/lectures/${lecture.id}`}
                          className="h5 text-decoration-none"
                        >
                          {lecture.title}
                        </Link>
                        <p className="mb-0 text-muted">{lecture.description}</p>
                      </div>
                    </div>
                    <span className="badge bg-secondary">{lecture.duration}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-footer">
              <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
