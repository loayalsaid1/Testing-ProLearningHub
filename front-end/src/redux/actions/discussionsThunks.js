import * as discussionsActions from './discussionsActionCreators';


const DOMAIN = 'http://localhost:3000';
export const getLectureDiscussions = (lectureId) => async (dispatch) => {
	dispatch(discussionsActions.toggleDiscussionsLoading());

	try {
		const response = await fetch(`${DOMAIN}/lectures/${lectureId}/discussion`);
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}

		dispatch(discussionsActions.lectureDiscussionSuccess({
			entries: data,
			lectureId
		}));
		
	}	catch (error) {
		console.error(error.message);
		dispatch(discussionsActions.lectureDiscussionFailure(error.message));
	}
}
