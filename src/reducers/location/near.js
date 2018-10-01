import { CRUD_GET_NEAR_MANY_SUCCESS } from '../../actions/dataActions';
const initialState = {};

export default (previousState = initialState, { type, payload, meta }) => {
  if (type === CRUD_GET_NEAR_MANY_SUCCESS) {
    //La richiesta attuale ha restituito nessun record, quindi onde
    //evitare di cancellare i precedenti, non tocco lo state
    if (payload.data.length === 0)
      return previousState;

    const resourceState = payload.data.reduce(
        (acc, record) => ({
          ...acc,
          [record.id] : payload.near[record.id]
        }), previousState[meta.resource] || {});

    
    const newState = {
        ...previousState,
        [meta.resource]: resourceState
    };
    return newState;
  }
  return previousState;
}
