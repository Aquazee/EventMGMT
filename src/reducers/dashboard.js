
import * as types from '../actions/actionTypes';

const initialAuthState = {
  loading: false,
  status: 0,
  data: []
};

function auth(state = initialAuthState, action) {
  const { type, payload, error } = action;
  switch (type) {
    case types.CREATE_EVENT_SUCCESS:
      let data = state.data;
      data.push(payload)
      return {
        ...state,
        data: data,
      };
    default:
      return state;
  }
}

export default auth;