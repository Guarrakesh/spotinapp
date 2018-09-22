
import {

  FETCH_BROADCASTS,

} from '../actions/types';


const defaultState = {

  listParams: {
    sort: null,
    order: null,
    page: 1,
    perPage: null,
    filter: {},
  },
  data: []
};

const broadcastsReducer = (state = defaultState, { type, payload, meta }) => {

  if (type === FETCH_BROADCASTS.SUCCESS) {
    return {...state, error: '', data:payload.data};
  }
  return state;

}

export default broadcastsReducer;


