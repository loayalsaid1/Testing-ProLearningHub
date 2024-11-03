import { createSelector } from 'reselect';

export const selectDiscussionsIsLoading = (state) => state.lectures.get('isLoading');

const selectLecturesDiscussions = (state) => state.discussions.get('lecturesDisussions');

export const makeLecutreDiscussionsSelector = (lectureId) => {
	createSelector([selectLecturesDiscussions], (lecturesDiscussions) => {
		return lecturesDiscussions.get(lectureId);
	})
}
