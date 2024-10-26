import toast from 'react-hot-toast';
import * as actions from '../actions/uiActionTypes';

const toastMiddleware = (store) => (next) => (action) => {
	switch (action.type) {
		case actions.SET_ERROR: {
			const { errorMessage } = action.payload;
			toast.error(errorMessage);
			return next(action);
		}

		case actions.LOGIN_SUCCESS: {
			toast.success('You are logged in!, Welcome!');
			return next(action);
		}

		case actions.LOGOUT: {
			toast.success('You are logged out!.. Bye!', {
				icon: '👋'
			});
			return next(action);
		}
		
		default: {
			return next(action);
		}
	}
}

export default toastMiddleware;
