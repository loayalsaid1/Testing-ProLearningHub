import { createSelector } from 'reselect';


export const selectIsLoading = (state) => state.announcements.get('isLoading');
export const selectAnnouncements = (state) => state.announcements.get('announcements');

export const selectComments = (state) => state.announcements.get('comments');
export const makeCommentsSelector = (announcementId) => createSelector(
	selectComments,
	(comments) => comments.get(announcementId)
)
