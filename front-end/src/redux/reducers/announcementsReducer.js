import { fromJS } from 'immutable';
import * as actions from '../actions/announcementsActionTypes';

export const initialState = fromJS({
  isLoading: false,
  announcementsError: null,
  announcements: [],
  comments: {},
});

export default function announcementsReducer(
  state = initialState,
  action = {}
) {
  switch (action.type) {
    case actions.TOGGLE_ANNOUNCEMENTS_LOADING:
      return state.set('isLoading', !state.get('isLoading'));

    case actions.SET_ANNOUNCEMENTS_ERROR:
      return state.set('announcementsError', action.payload.errorMessage);

    case actions.CLEAR_ANNOUNCEMENTS_ERROR:
      return state.set('announcementsError', null);

    case actions.FETCH_ANNOUNCEMENTS_REQUEST:
      return state.set('isLoading', true);

    case actions.FETCH_ANNOUNCEMENTS_FAILURE:
      return state.merge({
        isLoading: false,
        announcementsError: action.payload.errorMessage,
      });

    case actions.FETCH_ANNOUNCEMENTS_SUCCESS:
      return state.merge({
        isLoading: false,
        announcementsError: null,
        announcements: fromJS(action.payload.data),
      });

    default:
      return state;
  }
}
