import {
  SENDING_REQUEST, REQUEST_ERROR,
} from './types';

export function setText(text) { //eslint-disable-line
  return {
    type: CHANGE_TEXT,
    text
  }
}

export function getGoogle() { //eslint-disable-line
  return {
    type: GET_GOOGLE
  }

}
/**
* Setta lo stato 'currentlySending', che mostra un indicatore durante le richieste
* @param {boolean} sending True significa che stiamo inviando una richieste, falso altrimenti
*/
export function sendingRequest(sending) {
  return {type: SENDING_REQUEST, sending};
}

/**
* Setta lo stato 'error' quando una richiesta non è andata a buon fine
* @param {object} error L'errore che abbiamo ottenuto dalla richiesta
*/
export function requestError(error) {
  return {type: REQUEST_ERROR, error};
}
