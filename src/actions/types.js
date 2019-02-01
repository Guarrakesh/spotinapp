const REQUEST = 'REQUEST';
const SUCCESS = 'SUCCESS';
const FAILURE = 'FAILURE';

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



/* fetch actions Generiche */
export const GET_LIST = 'GET_LIST';
export const GET_ONE = 'GET_ONE';
export const GET_MANY = 'GET_MANY';
export const GET_MANY_REFERENCE = 'GET_MANY_REFERENCE';
export const CREATE = 'CREATE';
export const UPDATE = 'UPDATE';
export const UPDATE_MANY = 'UPDATE_MANY';
export const DELETE = 'DELETE';
export const DELETE_MANY = 'DELETE_MANY';

//Usato durante il pull to refresh
export const REFRESH_VIEW = 'REFRESH_VIEW';

/* Profile fetch actions */
//Simile a GET_ONE, con l'eccezione che non viene  mandato l'ID nel payload perché già c'à la token per riconoscere il profilo utente
export const GET_PROFILE = 'GET_PROFILE';

export const NAVIGATE = "Navigation/NAVIGATE";