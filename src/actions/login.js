import {LOGIN, LOGOUT, SET_AUTH, REGISTER} from './types';

export function loginRequest(email, password) {
    return {
        type: LOGIN.REQUEST,
        email,
        password,
    }
}

export function loginSuccess({token, user}) {
    return {
        type: LOGIN.SUCCESS,
        token,
        user,
    }
}

export function loginFailure(error) {
    return {
        type: LOGIN.FAILURE,
        error
    }
}

export function userLogout() {
    return {
        type: LOGOUT,
    }
}


export function registerRequest(email, password, name) {
    return {
        type: REGISTER.REQUEST,
        email, password, name

    }
}
/**
 * Imposta lo stato d'autenticazione dell'app
 * @param  {boolean} newAuthState Vero se l'utente è loggato, falso altrimenti
 */
export function setAuthState(newAuthState,token ) {
    return {
        type: SET_AUTH,
        newAuthState,
        token

    }
}
