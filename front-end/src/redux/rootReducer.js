import { combineReducers } from 'redux';
import helloReducer from './reducers/helloReducer';
import uiReducer from './reducers/uiReducer';
import lecturesReducer from './reducers/lecturesReducer';

const rootReducer = combineReducers({
	hello: helloReducer,
	ui: uiReducer,
	lectures: lecturesReducer,
})

export default rootReducer;
