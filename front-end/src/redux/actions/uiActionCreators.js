import * as actions from './uiActionTypes';

const DOMAIN = 'http://localhost:3000';

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

export const loginFailure = (errorMessage) => (dispatch) => {
  dispatch(setError('auth', errorMessage));
  dispatch(toggleLoading());
};

export const login = (email, password) => async (dispatch) => {
  dispatch(loginRequest());
  const request = new Request(`${DOMAIN}/auth/login`, {
    method: 'POST',
    body: JSON.stringify({ email, password }),
    headers: {
      'Content-Type': 'application/json',
    },
  });

  try {
    const response = await fetch(request);
    if (!response.ok) {
      switch (response.status) {
        case 401: {
          throw new Error('Please.. check again the email or the password!');
        }
        case 404: {
          throw new Error('Oops, that\'s a 404!');
        }
        default: {
          throw new Error('Unexpected error occured!');
        }
      }
    }

    const data = await response.json();
    dispatch(loginSuccess(data.user));
  } catch (error) {
    dispatch(loginFailure(error.message));
    console.error(error.message);
  }
};

export const setError = (errorType, errorMessage) => {
  return {
    type: actions.SET_ERROR,
    payload: {
      errorType,
      errorMessage,
    },
  };
};

export const clearError = (errorType) => {
  return {
    type: actions.CLEAR_ERROR,
    payload: { errorType },
  };
};
