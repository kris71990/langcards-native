import { createStore, applyMiddleware } from 'redux';
import thunk from './lib/redux-thunk';
import logState from './lib/redux-state';
import reducers from './reducers/index';

export default createStore(reducers, applyMiddleware(thunk, logState));
