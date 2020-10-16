import * as ACTION_TYPES from "../actions/actionTypes";

export const createEvent = (data) => ({
  type: ACTION_TYPES.CREATE_EVENT_SUCCESS,
  payload: data
});