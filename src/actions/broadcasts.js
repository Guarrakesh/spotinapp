import {FETCH_BROADCASTS} from "./types";

export function getBroadcastsRequest(eventId, position){
    return {
        type: FETCH_BROADCASTS.REQUEST,
        eventId,
        position
    }
}

export function getBroadcastsSuccess(eventId, broadcasts) {
    return {
        type: FETCH_BROADCASTS.SUCCESS,
        eventId,
        broadcasts
    }
}

