export const LOCATION_SET_POSITION = 'LOCATION_SET_POSITION';
export const LOCATION_SET_ERROR = 'LOCATION_SET_ERROR';
export const LOCATION_REQUEST = 'LOCATION_REQUEST';

export const locationPermission = () => ({
  type: LOCATION_REQUEST
});

export const setPosition = (position) => ({
  type: LOCATION_SET_POSITION,
  position
});