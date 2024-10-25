import * as actions from './uiActionTypes';

export const toggleLoading = () => {
  return { type: actions.TOGGLE_LOADING };
};

export const loginRequest = () => {
  return { type: actions.LOGIN_REQUEST };
};

export const loginSuccess = (user) => {
  return {
    type: actions.LOGIN_SUCCESS,
    payload: {
      user,
    },
  };
};

export const loginFailure = () => {
  return { type: actions.LOGIN_FAILURE };
};
