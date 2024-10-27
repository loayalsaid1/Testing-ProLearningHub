import { createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { composeWithDevTools } from '@redux-devtools/extension';
import toastMiddleware from './middlewares/toastMiddleware';
import rootReducer from './rootReducer';
const storeEnhancer = composeWithDevTools(
  applyMiddleware(thunk, toastMiddleware)
);

export default createStore(rootReducer, storeEnhancer);
