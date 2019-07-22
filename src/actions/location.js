export const LOCATION_SET_POSITION = 'LOCATION_SET_POSITION';
export const LOCATION_SET_ERROR = 'LOCATION_SET_ERROR';
export const LOCATION_REQUEST = 'LOCATION_REQUEST';
export const LOCATION_SET_USER_ADDRESS = 'LOCATION_SET_USER_ADDRESS';
export const LOCATION_USE_DEVICE_LOCATION = 'LOCATION_USE_DEVICE_LOCATION';
export const locationPermission = () => ({
  type: LOCATION_REQUEST
});

export const setPosition = (position) => ({
  type: LOCATION_SET_POSITION,
  position
});

export const useAddress = (position) => ({
  type: LOCATION_SET_USER_ADDRESS,
  position,
});
export const useDeviceLocation = () => ({
  type: LOCATION_USE_DEVICE_LOCATION,
});