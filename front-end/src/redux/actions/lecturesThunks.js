import * as actionCreators from './lecturesActionCreators';
import {DOMAIN} from '../../utils/constants'

export const getLectureById = (lectureId) => async (dispatch) => {
  dispatch(actionCreators.lectureRequest());

  try {
    const response = await fetch(`${DOMAIN}/courses/testId/lectures/${lectureId}`);
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

// I feel some sort of inconsistency here.. Because.. i'm requesting lectures
// and calling the things Lectures.. but i'm getting lectures into sections
// I donnt' know
export const getCourseLectures = (courseId) => async (dispatch) => {
  dispatch(actionCreators.sectionsRequest());

  try {
    const response = await fetch(`${DOMAIN}/courses/testId/lectures`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message);
    }

    dispatch(actionCreators.sectionsSuccess(data.sections));
  } catch (error) {
    console.error(error);
    dispatch(actionCreators.sectionsFailure(error.message));
  }
};
