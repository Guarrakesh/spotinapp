export const USER_LOGIN = 'USER_LOGIN';
export const USER_LOGIN_LOADING = 'USER_LOGIN_LOADING';
export const USER_LOGIN_SUCCESS = 'USER_LOGIN_SUCCESS';
export const USER_LOGIN_FAILURE = 'USER_LOGIN_FAILURE';
export const USER_CHECK = 'USER_CHECK';
export const USER_LOGOUT = 'USER_LOGOUT';

export const OAUTH_LOGIN = 'OAUTH_LOGIN';
export const OAUTH_LOGIN_LOADING = 'OAUTH_LOGIN_LOADING';
export const OAUTH_LOGIN_SUCCESS = 'OAUTH_LOGIN_SUCCESS';
export const OAUTH_LOGIN_FAILURE = 'OAUTH_LOGIN_FAILURE';

export const userLogin = (payload) => ({
    type: USER_LOGIN,
    payload,
    meta: { auth: true, pathName },
});


export const userCheck = (payload) => ({
    type: USER_CHECK,
    payload,
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
})
