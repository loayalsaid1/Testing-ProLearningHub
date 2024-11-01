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
  type: actions.SECTIONS_REQUEST
})

export const sectionsSuccess = (sections) => ({
  type: actions.SECTIONS_SUCCESS,
  payload: {
    sections
  }
})

export const sectionsFailure = (errorMessage) => ({
  type: actions.SECTIONS_FAILURE,
  payload: {
    errorMessage
  }
})
