import { fromJS } from 'immutable';
import * as actions from '../actions/announcementsActionTypes';

export const initialState = fromJS({
  isLoading: false,
  isCommentsLoading: false,
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

    case actions.FETCH_ANNOUNCEMENT_COMMENTS_REQUEST:
      return state.set('isComment', true);
    
    case actions.FETCH_ANNOUNCEMENT_COMMENTS_FAILURE:
      return state.merge({
        isComment: false,
        announcementsError: action.payload.errorMessage,
      });
    
    case actions.FETCH_ANNOUNCEMENT_COMMENTS_SUCCESS: {
      const {announcementId, comments} = action.payload;
      return state.update('comments', commentsMap =>
        commentsMap.set(announcementId, fromJS(comments))
      ).merge({
        isComment: false,
        announcementsError: null,
      });
    }

    case actions.ADD_COMMENT_REQUEST:
      return state.set('isCommentsLoading', true);

    case actions.ADD_COMMENT_FAILURE:
      return state.merge({
        isCommentsLoading: false,
        announcementsError: action.payload.errorMessage,
      });

    case actions.ADD_COMMENT_SUCCESS: {
      const { announcementId, comment } = action.payload;
      return state.updateIn(['comments', announcementId], (commentsList = fromJS([])) =>
        commentsList.push(fromJS(comment))
      ).merge({
        isCommentsLoading: false,
        announcementsError: null,
      });
    }

    default:
      return state;
  }
}
