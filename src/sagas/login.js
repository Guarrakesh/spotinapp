import React from 'react';
import { take, put, call, fork, race } from 'redux-saga/effects';
import NavigationService from '../navigators/NavigationService';
import { delay } from 'redux-saga';

import { wait } from './helpers';
import {
    LOGIN,
    LOGOUT,
    REGISTER } from '../actions/types';
import {
    loginSuccess,
    loginFailure,

    setAuthState,
    userLogout
} from '../actions/login';
import {
    sendingRequest,
    requestError
} from '../actions';
import auth from '../api/auth';



/**
 * Saga effect per gestire l'autorizzazione
 * @param {string} email                       L'email dell'utente
 * @param {string} password                    La password dell'utente
 * @param {object} options                     Opzioni (possono sempre servire...)
 * @param {boolean} options.isRegistering      E' una registrazione?
 * @param {string} name                        Nome del nuovo utente, valido solo se è una registrazione
 * @return {Object} Restituisce un oggetto token se ha successo, altrimenti null
 */
export function* authorize({email, password, isRegistering, name}) {
    //Mandiamo un'azione per dire a Redux che stiamo per inviare una richiesta
    yield put(sendingRequest(true));

    //Stiamo registrando o autenticando l'utente, dipende da "isRegistering"
    try {
        let response;
        if (!isRegistering) {
            response = yield call(auth.login, email, password);
        } else {
            response = yield call(auth.register, {email, password, name});
        }

        if (response && response.token && response.user) { //logged in {
            //Salvo la token e le info utente nello storage
            yield call(auth.setAuthToken, response.token);
            yield call(auth.setUserInfo, response.user);
            //Informo redux che ho finito la richiesta
            yield put(setAuthState(true, response.token));

            //Dico a redux di cambiare schermata
            yield call(NavigationService.navigate, 'SignedIn');
            return response.token;
        } else {
            //Informo redux dell'errore
            yield put(requestError(response))
            return null;
        }



    } catch (error) {
        //In caso di errore, informiamo Redux che c'è stato un errore
        yield put(requestError(error));
        return null;

    } finally {
        // Infine, informiamo redux che non c'è più nessuna richiesta
        yield put(sendingRequest(false));
    }
}

/**
 * Refresh della token
 * @param token
 */
export function* refresh(username, token) {
    yield put(sendingRequest(true));
    try {

        //Necessario anche qui preoccuparsi della race condition (vedi sotto in authentication());

        const {response} = yield race({

            response: call(auth.refresh, username, token),
            logout: take(LOGOUT)
        });
        //Se ha successo, `response` è direttamente l'oggetto token: {accessToken:... , refreshToken: ...}
        if (response && response.accessToken) {
            //Refresh eseguito, aggiorno la token
            yield call(auth.setAuthToken, response);
            yield put(setAuthState(true, response));
            yield put(sendingRequest(false));
            return response;
        } else { //L'utente ha fatto logout OPPURE il server ha risposto con un errore
            //In ogni caso, restituisco null (che verrà gestito da authentication());
            return null;

        }

    } catch (error) {

        yield put(requestError(error));
        return null;
    } finally {
        yield put(sendingRequest(false));
    }
}
export function redirectToLogin() {

    NavigationService.navigate('SignIn');
}
/**
 * Saga effect che gestisce il logout dell'utente
 */
export function* logout() {
    //Informo redux della richiesta
    /* yield put(sendingRequest(true));
     try {
     //const response = yield call(auth.logout);
     yield put(sendingRequest(false));

     } catch (error) {
     yield put(requestError(error.message));
     }*/

    yield put(setAuthState(false, null));
    yield call(auth.removeAuthToken);

}



/**
 * AuthFlow Saga
 */
function* authentication() {

    //Null se non è loggato

    let token = yield call(auth.getAuthToken);

    const storedUser = yield call(auth.getUserInfo);
    if (token) {
        //La token è già nello storage, la imposto come scaduta e la refresho
        token.expiresIn = 0;
    }

    while (true) {
        if (!token) {
            // C'è stato un logouit in precedenza, o l'app è stata aperta per la prima volta
            // Resto in attesa di una richiesta di Login
            const request = yield take(LOGIN.REQUEST);
            const {email, password} = request;

            token = yield call(authorize, {email, password, isRegistering: false});
            if (!token) {
                // Login fallito, resto in attesa di altre LOGIN.REQUEST
                continue;
            }
        }

        //A questo punto l'utente è loggato


        let userSignedOut;
        while (!userSignedOut) {

            //Estraggo i millisecondi alla scadenza della token, aspetto quei millisecondi
            //Dopo di ché refresho la token (se fallisce il refresh, faccio il logout)
            const dateNow = Date.now();
            const tokenExpire = Date.parse(token.expiresIn);
            const delayTime = token.expiresIn == 0 ? 0 : tokenExpire-dateNow;


            // Potrebbe accadere un 'LOGOUT' mentre l'effect Authorize è in corso,
            //il che potrebbe portare ad una RACE CONDITION. E' molto raro, ma onde evitare
            //chiamiamo 'race', che restituisce 'winner' (cioè colui che ha vinto la corsa)
            const {expired} = yield race({
                expired: call(delay,delayTime, true),
                logout: take(LOGOUT)
            });

            //Expired ha vinto la "corsa", la token è scaduta
            if (expired) {

                token = yield call(refresh, storedUser.email, token.refreshToken);

                if (!token) {
                    //Refresh fallito, logout dell'utente
                    userSignedOut = true;
                    yield call(logout);

                }
            } else {

                //L'utente è uscito prima che la token scadesse
                userSignedOut = true;
                token = null;
                yield call(logout);
            }
        }


    }
}



/**
 * Register saga
 * Molto simile a Login Saga
 */
export function * registerFlow () {
    while (true) {

        const request = yield take(REGISTER.REQUEST);

        const {email, password, name} = request;

        // Validazione dei dati (magari in seguito la spostiamo altrove, ma credo sia necessario eseguirla dalla saga)


        // Chiamo l'authorize dicendogli che è una registrazione
        // Restituisce `true` se la registrazione ha successo, `false` altrimenti
        const wasSuccessful = yield call(authorize, {email, password, isRegistering: true, name});

        if (wasSuccessful) {
            NavigationService.navigate('SignedIn');
        }

    }
}




export default function* root() {
    yield fork(authentication);
    yield fork(registerFlow);
}
