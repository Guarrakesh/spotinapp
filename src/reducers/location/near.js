import { CRUD_GET_NEAR_MANY_SUCCESS } from '../../actions/dataActions';
const initialState = {};

export default (previousState = initialState, { type, payload, meta }) => {
  if (type === CRUD_GET_NEAR_MANY_SUCCESS) {

    const resourceState = payload.data.reduce(
        (acc, record) => ({
          ...acc,
          [record.id] : payload.near[record.id]
        }), initialState[meta.resource] || {});

    const newState = {
        ...previousState,
        [meta.resource]: resourceState
    };
    return newState;
  }
  return previousState;
}