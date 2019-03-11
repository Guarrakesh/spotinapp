
import { get } from "lodash";
import { PROFILE_GET_INFO_SUCCESS } from "../actions/profile";
import { NAVIGATE } from "../actions/types";
import { LOCATION_SET_POSITION } from "../actions/location";
import {
  RESERVE_BROADCAST_SUCCESS,
  RESERVE_BROADCAST_START,
  RESERVE_BROADCAST_UNDO,
  RESERVE_BROADCAST_DELETE
} from "../actions/reservation";
import { CRUD_DELETE_OPTIMISTIC } from "../actions/dataActions";
import { SET_FAVORITES, SKIP_FAVORITES } from "../actions/profile";
import { ENTITY_VIEW as ENTITY_VIEW_ACTION } from "../actions/view";
import { coordsSelector } from "../reducers/location";
import { userId } from "../reducers/auth";

/**
 * Creo una EventsMap da dare poi come argomento al middleware creator di @redux-beacon.
 * Ogni eventDefinition è una funzione che prende l'action definita nella key e restituisce un'oggetto
 * che definisco io. In questo modo, ad ogni redux Action, posso associare un evento, che poi i rispettivi
 * tracker tracceranno.
 * @see https://rangle.gitbook.io/redux-beacon/index-1/events-map
 */
export const SET_USER_ID = "SET_USER_ID";
export const SCREEN_VIEW = "SCREEN_VIEW";
export const TRACK_LOCATION = "TRACK_LOCATION";
export const RESERVATION_COMPLETED = "RESERVATION_COMPLETED";
export const RESERVATION_START = "RESERVATION_START";
export const RESERVATION_UNDO = "RESERVATION_UNDO";
export const RESERVATION_DELETE = "RESERVATION_DELETE";
export const FAVORITE_SETTED = "FAVORITE_SETTED";
export const FAVORITE_SKIPPED = "FAVORITE_SKIPPED";
export const ENTITY_VIEW = 'ENTITY_VIEW';

// SportEvents 
export const EVENT_FAVORITE = "EVENT_FAVORITE";
export const MORE_EVENTS_SCROLL = "MORE_EVENTS_SCROLL";


const eventsMap = {
  [ENTITY_VIEW_ACTION]: ({ payload  }, state) => ({
    userId: userId(state),
    type: ENTITY_VIEW,
    entityId: payload.entityId,
    entityType: payload.entityType,
    params: payload.params,
    userPosition: coordsSelector(state),
  }),
  [PROFILE_GET_INFO_SUCCESS]: ({ payload }) => ({
    type: SET_USER_ID,
    userId: get(payload, "data._id"),

  }),
  [NAVIGATE]: ({ routeName, params }) => ({ //QUI PER AGGIUNGERE EVENTI DELLA NAVIGAZIONE
    type: SCREEN_VIEW,
    route: routeName,
    params
  }),
  [LOCATION_SET_POSITION]: ({ position }, state) => ({
    type: TRACK_LOCATION,
    position,
  }),
  [RESERVE_BROADCAST_SUCCESS]: ({ payload }, state) => ({ //PRENOTAZIONE COMPLETATA
    type: RESERVATION_COMPLETED,
    broadcastId: get(payload, "data.broadcast._id"),
    userId: get(payload, "data.user"),
    userPosition: coordsSelector(state)

  }),
  [RESERVE_BROADCAST_START]: ({ payload }, state) => ({ //INIZIO PRENOTAZIONE (Apertura modal)
    type: RESERVATION_START,
    broadcastId: get(payload, "data.broadcastId"),
    userId: get(payload, "data.userId"),
    userPosition: coordsSelector(state)
  }),
  [RESERVE_BROADCAST_UNDO]: ({ payload }, state) => ({ //PRENOTAZIONE ANNULLATA (Chiusura modal)
    type: RESERVATION_UNDO,
    broadcastId: get(payload, "data.broadcastId"),
    userId: get(payload, "data.userId"),
    userPosition: coordsSelector(state)
  }),
  [RESERVE_BROADCAST_DELETE]: ({ payload }, state) => ({ //PRENOTAZIONE ELIMINATA
    type: RESERVATION_DELETE,
    userId: get(payload, "userId"),
    reservationId: get(payload, "reservationId"),
    broadcastId: get(payload, "broadcastId"),
    userPosition: coordsSelector(state)
  }),
  [SET_FAVORITES]: ({ payload }, state) => ({  //SELEZIONE SPORT E COMPETITORS PREFERITI
    type: FAVORITE_SETTED,
    userId: get(payload, "userId"),
    favorite_sports: get(payload, "favorite_sports"),
    favorite_competitors: get(payload, "favorite_competitors"),
    userPosition: coordsSelector(state)
  }),
  [SKIP_FAVORITES]: () => ({
    type: FAVORITE_SKIPPED,

  })
};

export default eventsMap;