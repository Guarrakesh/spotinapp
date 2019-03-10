import { fetchJson } from '../helpers/fetch';
import vars from '../vars';

const { apiUrl } = vars;


const ACTIVITY_TYPES = {
  VIEW: 'view',
  GET_OFFER_COMPLETE: 'get_offer',
  GET_OFFER_CANCEL: 'get_offer_cancel',
  CANCEL_OFFER: 'cancel_offer',
  FAVORITE_SET: 'favorite_set',
  FAVORITE_SKIP: 'favorite_skip',

};

export const logActivity = (activityType, entityType, entityId, activityParams, meta) => {

  const body = {
    activityType,
    entityType,
    entityId,
    activityParams,
    meta
  };
  console.log(body);
  return fetchJson(`${apiUrl}/activities`, {
    method: 'POST',
    body: JSON.stringify(body)
  });
};


export const logView = (entityType, entityId, params, meta) => {
  return logActivity(ACTIVITY_TYPES.VIEW, entityType, entityId, params, meta);
};

export const logGetOfferComplete = (broadcastId, userId, meta = {}) => {
  return logActivity(ACTIVITY_TYPES.GET_OFFER_COMPLETE, 'broadcast',
      broadcastId, {}, { user: userId, ...meta});
};

export const logGetOfferCancel = (broadcastId, userId, meta = {}) => {
  return logActivity(ACTIVITY_TYPES.GET_OFFER_CANCEL, 'broadcast',
      broadcastId, {}, { user: userId, ...meta});
};

export const logCancelOffer = (broadcastId, userId, meta = {}) => {
  return logActivity(ACTIVITY_TYPES.CANCEL_OFFER, 'broadcast',
      broadcastId, {}, { user: userId, ...meta});
};

export const logFavoriteSet = (userId, favorites, meta = {}) => {
  return logActivity(
      ACTIVITY_TYPES.FAVORITE_SET,
      undefined,
      undefined,
      { favorites },
      { user: userId, ...meta }
      );
};

export const logFavoriteSkip = (meta = {}) => {
  return logActivity(
      ACTIVITY_TYPES.FAVORITE_SKIP,
          undefined,
          undefined,
          {},
          meta
  )
};