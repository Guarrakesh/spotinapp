import {
  CRUD_GET_ONE_SUCCESS,
  CRUD_DELETE_SUCCESS,
  CRUD_GET_LIST_SUCCESS,
  CRUD_DELETE_OPTIMISTIC,
  CRUD_DELETE_MANY_OPTIMISTIC,
  CRUD_GET_NEAR_MANY_SUCCESS
} from '../../../actions/dataActions';

export default (previousState = 0, { type, payload }) => {

  if (type === CRUD_GET_ONE_SUCCESS) {
    return previousState === 0 ? 1 : previousState;
  }
  if (type === CRUD_GET_LIST_SUCCESS || type === CRUD_GET_NEAR_MANY_SUCCESS) {
    return payload.total;
  }
  if (type === CRUD_DELETE_OPTIMISTIC || type === CRUD_DELETE_SUCCESS) {
    return previousState - 1;
  }
  if (type === CRUD_DELETE_MANY_OPTIMISTIC) {
    return previousState - payload.ids.length;
  }
  return previousState;

};
