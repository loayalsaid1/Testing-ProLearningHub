import { fromJS, Map } from 'immutable';
import * as actions from '../actions/uiActionTypes';

export const initialState = fromJS({
  isLoading: false,
  isLoggedIn: false,
  user: {},
  loginError: false,
});

export default function uiReducer(state = initialState, action = {}) {
  switch (action.type) {
    case actions.TOGGLE_LOADING: {
      return state.set('isLoading', !state.get('isLoading'));
    }

    case actions.LOGIN_REQUEST: {
      return state.set('isLoading', true);
    }

    case actions.LOGIN_SUCCESS: {
      const user = Map(action.payload.user);

      return state.withMutations((mutableState) => {
        return mutableState
          .set('isLoading', false)
          .set('isLoggedIn', true)
          .set('user', Map(user))
          .set('loginError', false);
      });
    }

    case actions.LOGIN_FAILURE: {
      return state.withMutations((mutableState) => {
        return mutableState.set('isLoading', false).set('loginError', true);
      });
    }

    default: {
      return state;
    }
  }
}
