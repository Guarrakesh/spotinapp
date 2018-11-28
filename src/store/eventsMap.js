
import { get } from "lodash";
import { PROFILE_GET_INFO_SUCCESS } from "../actions/profile";
import { NAVIGATE } from "../actions/types";
import { LOCATION_SET_POSITION } from "../actions/location";

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
const eventsMap = {
    [PROFILE_GET_INFO_SUCCESS]: ({ payload }) => ({
        type: SET_USER_ID,
        userId: get(payload, "data._id"),

    }),
    [NAVIGATE]: ({ routeName, params }) => ({
        type: SCREEN_VIEW,
        route: routeName,
        params
    }),
    [LOCATION_SET_POSITION]: ({ position }) => ({
        type: TRACK_LOCATION,
        position,
    })
};

export default eventsMap;