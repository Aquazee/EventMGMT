import { createStore, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { persistState } from 'redux-devtools';
import { routerMiddleware } from 'react-router-redux';
import { browserHistory } from 'react-router';

import rootReducer from '../reducers';


const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
