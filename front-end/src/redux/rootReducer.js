import { combineReducers } from 'redux';
import helloReducer from './reducers/helloReducer';
import uiReducer from './reducers/uiReducer';
import lecturesReducer from './reducers/lecturesReducer';
import discussionsReducer from './reducers/discussionsReducer';
import announcementsReducer from './reducers/announcementsReducer';

const rootReducer = combineReducers({
	hello: helloReducer,
	ui: uiReducer,
	lectures: lecturesReducer,
	discussions: discussionsReducer,
	announcements: announcementsReducer,
})

export default rootReducer;
