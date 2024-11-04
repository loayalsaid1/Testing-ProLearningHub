import toast from 'react-hot-toast';
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
			lectureId: lectureId
		}));
		
	}	catch (error) {
		console.error(error.message);
		dispatch(discussionsActions.lectureDiscussionFailure(`Error fetching entries: ${error.message}`));
	}
}

export const AddLectureDiscussionEntry = (lectureId, title, details) => async (dispatch) => {
	dispatch(discussionsActions.addDiscussionEntryRequest());

	const userId = getState().ui.getIn(['user', 'id']) || 'testId';
	const promise = toast.promise(
		fetch(`${DOMAIN}/lectures/${lectureId}/discussion`, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({
				userId,
				title,
				body: details
			})
		}),
		{
			loading: 'Sending your Entry',
			success: 'Your Entry has been sent',
			error: 'Error sending your question',
		}
	)

	try {
		const response = await promise;
		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message);
		}
		dispatch(discussionsActions.addDiscussionEntrySuccess({
			lectureId,
			entry: data,
		}));
	} catch (error) {
		console.error(error.message);
		dispatch(discussionsActions.addDiscussionEntryFailure(`Error adding entry: ${error.message}`));
	}
}
