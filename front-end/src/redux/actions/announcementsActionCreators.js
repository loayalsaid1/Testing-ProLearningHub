import * as actions from './announcementsActionTypes';

export const setAnnouncementsError = (errorMessage) => ({
  type: actions.SET_ANNOUNCEMENTS_ERROR,
  payload: { errorMessage },
});

export const clearAnnouncementsError = () => ({
  type: actions.CLEAR_ANNOUNCEMENTS_ERROR,
});

export const toggleAnnouncementsLoading = () => ({
  type: actions.TOGGLE_ANNOUNCEMENTS_LOADING,
});

export const fetchAnnouncementsRequest = () => ({
  type: actions.FETCH_ANNOUNCEMENTS_REQUEST,
});

export const fetchAnnouncementsFailure = (errorMessage) => ({
  type: actions.FETCH_ANNOUNCEMENTS_FAILURE,
  payload: { errorMessage },
});

export const fetchAnnouncementsSuccess = (data) => ({
  type: actions.FETCH_ANNOUNCEMENTS_SUCCESS,
  payload: { data },
});

export const fetchAnnouncementCommentsRequest = (announcementId) => ({
  type: actions.FETCH_ANNOUNCEMENT_COMMENTS_REQUEST,
});

export const fetchAnnouncementCommentsFailure = (errorMessage) => ({
  type: actions.FETCH_ANNOUNCEMENT_COMMENTS_FAILURE,
  payload: { errorMessage },
});

export const fetchAnnouncementCommentsSuccess = (announcementId, data) => ({
  type: actions.FETCH_ANNOUNCEMENT_COMMENTS_SUCCESS,
  payload: { announcementId, comments: data },
});
