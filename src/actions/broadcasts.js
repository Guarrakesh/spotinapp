import {FETCH_BROADCASTS, RESERVE_BROADCAST} from "./types";

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

export function reserveBroadcastRequest(broadcastId) {
    return {
        type: RESERVE_BROADCAST.REQUEST,
        broadcastId
    }
}

export function reserveBroadcastSuccess(reservation) {
    return {
        type: RESERVE_BROADCAST.REQUEST,
        reservation
    }
}
