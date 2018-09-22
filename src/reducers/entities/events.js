import { EVENT_GET_LIST } from '../../actions/events';
import { FETCH_EVENTS } from '../../actions/types';


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

const eventsReducer = (state = defaultState, { type, payload, meta }) => {
  if (type === FETCH_EVENTS.SUCCESS)
    return {...state, error:'', data:payload.data};
};


export default eventsReducer;


