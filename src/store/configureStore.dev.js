import { createStore, applyMiddleware, compose } from 'redux';
import thunkMiddleware from 'redux-thunk';
import { persistStore, persistReducer } from "redux-persist";
import { multiClientMiddleware } from "redux-axios-middleware";
import rootReducer from '../reducers';
import clients from "./clients";
import storage from "redux-persist/lib/storage";
import { composeWithDevTools } from "redux-devtools-extension";
const middlewareConfig = {
  interceptors: {
    request: [{
      success: function ({ getState, dispatch, getSourceAction }, req) {
        var token = getState().auth.userToken;
        req.headers.Authorization = `Bearer ${token}`
        return req;
      },
      error: function ({ getState, dispatch, getSourceAction }, error) {
        return error
      }
    }]
  }
}

const persistConfig = {
  key: "root",
  blacklist: [],
  whitelist: ["auth"],
  keyPrefix: 'EventManagement',
  storage: storage
};
const middlewares = [
  thunkMiddleware,
  multiClientMiddleware(clients, middlewareConfig),
];
const persistedReducer = persistReducer(persistConfig, rootReducer);
export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)));
  let persistor = persistStore(store);
  return { store, persistor };
};
