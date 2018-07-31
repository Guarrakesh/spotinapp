import { FETCH_EVENTS } from "./types";


export function getEventsRequest(competitionId){
    return { type: FETCH_EVENTS.REQUEST, competitionId}
}

export function getEventsSuccess(events){
    return {
        type: FETCH_EVENTS.SUCCESS,
        events
    }
}

