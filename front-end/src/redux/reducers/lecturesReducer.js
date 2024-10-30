import { Map } from 'immutable';
import * as actions from '../actions/lecturesActionTypes';

/**
 * Next there must be away to keep the data in sync..
 * may be just long polling.. or here setting a typestamp for when was last
 * time fetch and with intervals.. check if data changed..
 * or something outside the scope of redux.. which is utelising websotckets
 * to ping react when a change happens
 */
export const initialState = Map({
  isLoading: false,
  lectureError: null,
  lectures: {},
});

export default function lecturesReducer(state = intialState, action = {}) {
  switch (action.type) {
    case actions.LECTURE_REQUEST: {
      return state.set('isLoading', true);
    }

    case actions.LECTURE_FAILURE: {
      return state.withMutations((state) => {
        return state
          .set('isLoading', false)
          .set('lectureError', action.payload.errorMessage);
      });
    }

    case actions.LECTURE_SUCCESS: {
      const { lectureData } = action.payload;
      return state.withMutations((state) => {
        return state
          .set('isLoading', false)
          .set('lectureError', null)
          .setIn(['lectures', lectureData.id], lectureData);
      });
    }

    case actions.SET_LECTURE_ERROR: {
      return state.withMutations((state) => {
        return state
          .set('isLoading', false)
          .set('lectureError', action.payload.errorMessage);
      });
    }

    case actions.CLEAR_LECTURE_ERROR: {
      return state.set('lectureError', false);
    }

    default: {
      return state;
    }
  }
}
