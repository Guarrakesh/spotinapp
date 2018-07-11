const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE'

export const SENDING_REQUEST = 'SENDING_REQUEST';
export const REQUEST_ERROR = 'REQUEST_ERROR';

//Per ogni tipo di componente, crea le sue 3 azioni di default
//es: const LOGIN = createRequest('LOGIN')
//restituisce:
//LOGIN.REQUEST, LOGIN.SUCCESS, LOGIN.FAILURE
 export function createRequestTypes(base) {
  const res = {};
  [REQUEST, SUCCESS, FAILURE].forEach(type => res[type] = `${base}_${type}`);
  return res;
}

export const LOGIN = createRequestTypes('LOGIN');
export const LOGOUT = 'LOGOUT';
export const REGISTER = createRequestTypes('REGISTER');
export const SET_AUTH = 'SET_AUTH';
export const FETCH_ALL_SPORTS = createRequestTypes('GET_ALL_SPORTS');
export const FETCH_FAVORITE_SPORTS = createRequestTypes('GET_FAVORITE_SPORTS');

