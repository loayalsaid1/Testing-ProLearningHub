import * as actionCreators from './lecturesActionCreators'


const DOMAIN = 'http://localhost:3000';


export const getLectureById = lectureId => async dispatch => {
	dispatch(actionCreators.lectureRequest);

	try {
		const response = await fetch(`${DOMAIN}/courses/testId/lectures/testId`)
		const data = await response.json()

		if (!response.ok) {
			throw new Error(data.message);
		}
	} catch (error) {
		console.error(data.message);
		dispatch(actionCreators.lectureFailure(error.message))
	}
	
	dispatch(actionCreators.lectureSuccess(data.lectureData))
}
