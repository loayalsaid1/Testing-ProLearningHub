import { combineReducers } from 'redux';
import helloReducer from './reducers/helloReducer';
import uiReducer from './reducers/uiReducer';

const rootReducer = combineReducers({
	hello: helloReducer,
	ui: uiReducer
})

export default rootReducer;
