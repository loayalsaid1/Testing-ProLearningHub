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

export const loginFailure = errorMessage => dispatch => {
	dispatch(setError('auth', errorMessage));
	dispatch(toggleLoading());
}

export const setError = (errorType, errorMessage) => {
  return {
    type: actions.SET_ERROR,
    payload: {
      errorType,
      errorMessage,
    },
  };
};

export const clearError = errorType => {
	return {
		type: actions.CLEAR_ERROR,
		payload: {errorType}
	}
}
