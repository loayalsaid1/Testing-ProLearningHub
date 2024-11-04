import * as actions from './discussionsActionTypes';

export const setDiscussionsError = (errorMessage) => ({
  type: actions.SET_DISCUSSIONS_ERROR,
  payload: {
    errorMessage,
  },
});

export const clearDiscussionsError = () => ({
  type: actions.CLEAR_DISCUSSIONS_ERROR,
});

export const toggleDiscussionsLoading = () => ({
  type: actions.TOGGLE_DISCUSSIONS_LOADING,
});

export const lectureDiscussionRequest = () => ({
  type: actions.LECTURE_DISCUSSION_REQUEST,
});

export const lectureDiscussionFailure = (errorMessage) => ({
  type: actions.LECTURE_DISCUSSION_FAILURE,
  payload: {
    errorMessage,
  },
});

export const lectureDiscussionSuccess = (response) => ({
  type: actions.LECTURE_DISCUSSION_SUCCESS,
  payload: {
    entries: response.entries,
    lectureId: response.lectureId
  },
});

export const addDiscussionEntryRequest = () => ({
  type: actions.ADD_DISCUSSION_ENTRY_REQUEST,
})

export const addDiscussionEntryFailure = (errorMessage) => ({
  type: actions.ADD_DISCUSSION_ENTRY_FAILURE,
  payload: {
    errorMessage
  }
})

export const addDiscussionEntrySuccess = ({lectureId, entry}) => ({
  type: actions.ADD_DISCUSSION_ENTRY_SUCCESS,
  payload: {
    lectureId,
    entry
  }
})
