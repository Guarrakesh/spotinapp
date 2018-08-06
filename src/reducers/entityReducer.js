import {
    FETCH_ALL_SPORTS,
    FETCH_FAVORITE_SPORTS,
    REQUEST_ERROR,
    SENDING_REQUEST,
    FETCH_COMPETITIONS, FETCH_EVENTS
} from '../actions/types';



let initialState = {

    sports: [],
    events: [], //contiene tutti gli eventi di ogni competizione,
    //businesses: [],
    currentlySending: false,
    error: ''

};

export default function entityReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_ALL_SPORTS.SUCCESS:
        case FETCH_FAVORITE_SPORTS.SUCCESS:
            return {...state, error:'', sports: action.sports};


        case FETCH_COMPETITIONS.SUCCESS:
            let sports = state.sports.map((sport) => {

            if (sport._id == action.sportId)
                    sport['competitions'] = action.competitions;
                return sport;
            });

            return { ...state, error:'', sports: sports};

        case FETCH_EVENTS.SUCCESS:
            return {...state, error:'', events: action.events};

        case SENDING_REQUEST:
            return {...state, currentlySending: action.sending};


        case REQUEST_ERROR:
            return {...state, error: action.error};

        case FETCH_BUSINESSES.SUCCESS:

           let events = state.events.map((event) {
             if (event._id == action.eventId) {
               event['businesses'] = action.businessess;
             }

             return event;
           });

           return{...state, error: '', events: events }


        default:
            return state;
    }
}
