import { fromJS } from 'immutable';

export const initialState = fromJS({
  isLoading: false,
  announcementsError: null,
  announcements: [],
  comments: {},
});

export default function announcementsReducer(state = initialState, action = {}) {
	switch (action.type) {
		default:
			return state;
	}
}

