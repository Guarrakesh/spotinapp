import {RESERVE_BROADCAST} from "./types";

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