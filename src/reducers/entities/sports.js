import { FETCH_ALL_SPORTS, FETCH_FAVORITE_SPORTS, FETCH_COMPETITIONS } from '../../actions/types';


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

const sportsReducer = (state = defaultState, { type, payload, meta }) => {
  switch (type) {
    case FETCH_ALL_SPORTS.SUCCESS:
    case FETCH_FAVORITE_SPORTS.SUCCESS:
      return {...state, data: payload.data};

    case FETCH_COMPETITIONS.SUCCESS:
      let sports = state.data.map((sport) => {

        if (sport._id == action.sportId)
          sport['competitions'] = action.competitions;
        return sport;
      });

      return { ...state, data: payload.data};


    default:
      return state;


  }

}

export default evsportsReducerentsReducer;


