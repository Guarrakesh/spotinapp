import { FETCH_BUSINESSES } from './types';

export function getBusinessRequest(position){
    return { type: FETCH_BUSINESSES.REQUEST, position}
}

export function getBusinessSuccess(businesses){
  return {
          type: FETCH_BUSINESSES.SUCCESS,
          businesses
  }
}
