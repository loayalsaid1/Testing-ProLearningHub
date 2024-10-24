import helloReducer from './reducers/helloReducer';
import { combineReducers } from 'redux';

const rootReducer = combineReducers({
	hello: helloReducer,
})

export default rootReducer;
