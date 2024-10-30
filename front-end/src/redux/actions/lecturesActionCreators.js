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
  type: actions.lectureFailure,
  payload: {
    errorMessage,
  },
});
