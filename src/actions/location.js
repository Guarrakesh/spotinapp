import { GET_CURRENT_LOCATION } from "./types";

export function getLocationRequest(){
    return { type: GET_CURRENT_LOCATION.REQUEST}
}


//response e' passato dal saga quando chiama "yield put(getLocationSuccess(response.coords));"
//response ha dentro i valroi restituiti dalla API getCurrentLocation()
//tra cui Latitude e longitude, che qui passo
export function getLocationSuccess(response){
    return {
        type: GET_CURRENT_LOCATION.SUCCESS,
        latitude: response.latitude,
        longitude: response.longitude
    }
}

export function getLocationFailure(error){
    return {
        type: GET_CURRENT_LOCATION.FAILURE,
        error
    }
}