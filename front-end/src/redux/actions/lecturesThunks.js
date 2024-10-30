import * as actionCreators from './lecturesActionCreators';

const DOMAIN = 'http://localhost:3000';

export const getLectureById = (lectureId) => async (dispatch) => {
  dispatch(actionCreators.lectureRequest);

  try {
    const response = await fetch(`${DOMAIN}/courses/testId/lectures/testId`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }
		dispatch(actionCreators.lectureSuccess(data.lectureData));
  } catch (error) {
    console.error(error.message);
    dispatch(actionCreators.lectureFailure(error.message));
  }

};
