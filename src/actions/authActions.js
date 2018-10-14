export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_CHECK = 'USER_CHECK';
export const USER_LOGOUT = 'USER_LOGOUT';

export const USER_REGISTER = 'USER_REGISTER';
export const USER_REGISTER_SUCCESS = 'USER_REGISTER_SUCCESS';
export const USER_REGISTER_FAILURE = 'USER_REGISTER_FAILURE';
export const USER_REGISTER_LOADING = 'USER_REGISTER_LOADING';


export const OAUTH_LOGIN = 'OAUTH_LOGIN';
export const OAUTH_LOGIN_LOADING = 'OAUTH_LOGIN_LOADING';
export const OAUTH_LOGIN_SUCCESS = 'OAUTH_LOGIN_SUCCESS';
export const OAUTH_LOGIN_FAILURE = 'OAUTH_LOGIN_FAILURE';

export const AUTH_CHECKING = 'AUTH_CHECKING';

/**
 *
 * @param payload
 * @param pathName Nome dello screen a cui rimandare dopo il login
 */
export const userLogin = (payload, pathName) => ({
  type: USER_LOGIN,
  payload,
  meta: { auth: true, pathName },
});

/**
 *
 * @param payload Parametri aggiuntivi da mandare
 * @param pathName Nome dello screen a cui rimandare dopo che l'utente è loggato (in caso di logout)
 * @param routeParams Parametri da inserire nello state della navigazione
 */
export const userCheck = (payload, pathName, routeParams) => ({
  type: USER_CHECK,
  payload: {
    ...payload,
    routeParams,
  },
  meta: { auth: true, pathName },
});


/**
 * Action to trigger logout of the current user. The entire redux state will be cleared
 * thanks to the resettableAppReducer in Admin.
 * @see: Admin.js
 * @param redirectTo Path to direct to after logout
 * @return {{type: string, payload: {redirectTo: string}, meta: {auth: boolean}}}
 */
export const userLogout = redirectTo => ({
  type: USER_LOGOUT,
  meta: { auth: true },
});

export const oAuthFacebookLogin = (payload) => ({
  type: OAUTH_LOGIN,
  payload: { service: 'facebook', ...payload },
  meta: { auth: true },
});


export const userRegister = (payload, pathName) => ({
  type: USER_REGISTER,
  payload,
  meta: { auth: true, pathName}
});
