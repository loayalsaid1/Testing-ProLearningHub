import { Map } from 'immutable';
import * as actions from '../actions/lecturesActionTypes';

export const initialState = Map({
  isLoading: false,
  lectureError: null,
  lectures: [],
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
      return state.withMutations((state) => {
        const { lectureData } = action.payload;
        return state
          .set('isLoading', false)
          .set('lectureError', null)
          .update('lectures', (lectures) => lectures.concat([lectureData]));
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
