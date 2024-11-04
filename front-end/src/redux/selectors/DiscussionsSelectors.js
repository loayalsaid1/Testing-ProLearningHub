import { createSelector } from 'reselect';

export const selectDiscussionsIsLoading = (state) => state.discussions.get('isLoading');

const selectLecturesDiscussions = (state) => state.discussions.get('lecturesDiscussions');

export const makeLecutreDiscussionsSelector = (lectureId) => {
	createSelector([selectLecturesDiscussions], (lecturesDiscussions) => {
		return lecturesDiscussions.get(lectureId);
	})
}
