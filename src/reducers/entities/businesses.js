import {

  FETCH_BUSINESSES,

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

const businessesReducer = (state = defaultState, { type, payload, meta }) => {

  if (type === FETCH_BUSINESSES.SUCCESS)
    return {...state, error:'', data: payload.data};

}

export default businessesReducer;


