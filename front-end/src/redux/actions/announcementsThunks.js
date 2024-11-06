import * as creators from './announcementsActionCreators'
import { DOMAIN } from '../../utils/constants';

export const fetchAnnouncements = () => async (dispatch, getState) => {
	dispatch(creators.fetchAnnouncementsRequest());
	const courseId = getState().ui.getIn(['course', 'id']) || 'testId';
	try {
		const response = await fetch(`${DOMAIN}/courses/${courseId}/announcements`);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}

		dispatch(creators.fetchAnnouncementsSuccess(data));
	} catch (error) {
		console.error(error.message);
		dispatch(creators.fetchAnnouncementsFailure(error.message));
	}
}

export const fetchAnnouncementComments = (announcementId) => async (dispatch) => {
	dispatch(creators.fetchAnnouncementCommentsRequest(announcementId));
	try {
		const response = await fetch(`${DOMAIN}/announcements/${announcementId}/comments`);
		const data = await response.json();
		if (!response.ok) {
			throw new Error(data.message);
		}
		dispatch(creators.fetchAnnouncementCommentsSuccess(announcementId, data));
	} catch (error) {
		console.error(error.message);
		dispatch(creators.fetchAnnouncementCommentsFailure(error.message));
	}
}
