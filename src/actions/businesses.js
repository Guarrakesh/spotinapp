import { FETCH_BUSINESSES } from './types';

export function getBusinessRequest(eventId, latitude, longitude){
    return { type: FETCH_BUSINESSES.REQUEST, }
}

export function getBusinessSuccess(eventId, businesses){
  return {
          type: FETCH_BUSINESSES.SUCCESS,
          eventId,
          businesses
  }
}
