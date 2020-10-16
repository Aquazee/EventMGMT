import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import { routerReducer } from 'react-router-redux';

import dashboard from './dashboard';

const rootReducer = combineReducers({
  routing: routerReducer,
  form: formReducer,
  dashboard
});

export default rootReducer;
