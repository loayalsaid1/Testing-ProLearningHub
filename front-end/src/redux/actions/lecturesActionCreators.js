import * as actions from './lecturesActionTypes';

export const setLectureLoading = (value) => {
  return {
    type: actions.SET_LECTURE_LOADING,
    payload: {
      value,
    },
  };
};

export const setLectureError = (errorMessage) => {
  return {
    type: actions.SET_LECTURE_ERROR,
    payload: {
      errorMessage,
    },
  };
};

export const lectureRequest = () => ({
  type: actions.LECTURE_REQUEST,
});

export const lectureSuccess = (lectureData) => ({
  type: actions.LECTURE_SUCCESS,
  payload: {
    lectureData,
  },
});

export const lectureFailure = (errorMessage) => ({
  type: actions.LECTURE_FAILURE,
  payload: {
    errorMessage,
  },
});

export const sectionsRequest = () => ({
  type: actions.SECTIONS_REQUEST,
});

export const sectionsSuccess = (sections) => ({
  type: actions.SECTIONS_SUCCESS,
  payload: {
    sections,
  },
});

export const sectionsFailure = (errorMessage) => ({
  type: actions.SECTIONS_FAILURE,
  payload: {
    errorMessage,
  },
});

export const createLectureRequest = () => ({
  type: actions.CREATE_LECTURE_REQUEST,
});

export const createLectureSuccess = (newLecture) => ({
  type: actions.CREATE_LECTURE_SUCCESS,
  payload: {
    newLecture,
  },
});

export const createLectureFailure = (errorMessage) => ({
  type: actions.CREATE_LECTURE_FAILURE,
  payload: {
    errorMessage,
  },
});

export const deleteLectureRequest = () => ({
  type: actions.DELETE_LECTURE_REQUEST,
});

export const deleteLectureFailure = (errorMessage) => ({
  type: actions.DELETE_LECTURE_FAILURE,
  payload: {
    errorMessage,
  },
});

export const deleteLectureSuccess = (sectionId, lectureId) => ({
  type: actions.DELETE_LECTURE_SUCCESS,
  payload: {
    sectionId,
    lectureId,
  },
});

export const editLectureRequest = () => ({
  type: actions.EDIT_LECTURE_REQUEST,
});

export const editLectureFailure = (errorMessage) => ({
  type: actions.EDIT_LECTURE_FAILURE,
  payload: {
    errorMessage,
  },
});

export const editLectureSuccess = (editedLecture) => ({
  type: actions.EDIT_LECTURE_SUCCESS,
  payload: {
    editedLecture,
  },
});

export const resetLectureEdited = () => ({
  type: actions.RESET_LECTURE_EDITED,
});
