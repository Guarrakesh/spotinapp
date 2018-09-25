import { FETCH_EVENTS, GET_LIST } from "./types";

export const EVENT_GET_LIST = 'EVENT_GET_LIST';

// DEPRECATED:
export function getEventsRequest(competitionId, pagination = {}, filter = {}){
    return { type: FETCH_EVENTS.REQUEST, competitionId }
}

export function getEventsSuccess(events){
    return {
        type: FETCH_EVENTS.SUCCESS,
        events
    }
}

export const getEventList = (pagination, sort, filter) => ({
    type: EVENT_GET_LIST,
    payload: { pagination, sort, filter },
    meta: {
        fetch: GET_LIST,
    }
});

