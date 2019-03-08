import {
  all,
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { AsyncStorage } from 'react-native';
import {PROFILE_GET_INFO_SUCCESS, SET_FAVORITES, updateProfile} from "../../actions/profile";
import {USER_LOGIN_SUCCESS, OAUTH_LOGIN_SUCCESS} from "../../actions/authActions";
import { showNotification } from "../../actions/notificationActions";
import { sendingRequest } from "../../actions";

export const FAVORITE_SPORTS = "FAVORITE_SPORTS";
export const FAVORITE_COMPETITORS = "FAVORITE_COMPETITORS";
export const ALREADY_SET_FAVORITE = "ALREADY_SET_FAVORITE";

export function* handleSetFavorites(action){

  const { payload } = action;

  //In ogni caso salvo su dispositivo gli sport e i competitor preferiti, piu' un attributo che segnala che sono gia' stati scelti
  yield call(AsyncStorage.setItem, FAVORITE_SPORTS, JSON.stringify(payload.favorite_sports));
  yield call(AsyncStorage.setItem, FAVORITE_COMPETITORS, JSON.stringify(payload.favorite_competitors));
  yield call(AsyncStorage.setItem, ALREADY_SET_FAVORITE, "1");

  //Se nella chiamata ho un id utente allora faccio la chiamata al server per lo store dei preferiti
  if(payload.userId){
    yield put(sendingRequest(true));
    try{

      yield put(updateProfile({userId: payload.userId, favorite_sports: payload.favorite_sports, favorite_competitors: payload.favorite_competitors}));

    }catch(error){
      showNotification("Qualcosa è andato storto...", "warning");
    }
    finally {
      yield put(sendingRequest(false));
    }
  }

}

export function* updateFavorite(action){

  const { payload } = action;

  let favoriteSports = yield call(AsyncStorage.getItem, FAVORITE_SPORTS);
  let favoriteCompetitors = yield call(AsyncStorage.getItem, FAVORITE_COMPETITORS);
  const favoriteAlreadySetted = yield call(AsyncStorage.getItem, ALREADY_SET_FAVORITE);

  //caso in cui l'utente ha già fatto la scelta dei preferiti e sta accedendo
  if(favoriteAlreadySetted && favoriteSports && favoriteCompetitors && payload.user && payload.user.favorite_sports.length === 0){

    favoriteSports = JSON.parse(favoriteSports);
    favoriteCompetitors = JSON.parse(favoriteCompetitors);

    yield put(sendingRequest(true));
    try{
      yield put(updateProfile({userId: payload.user._id, favorite_sports: favoriteSports, favorite_competitors: favoriteCompetitors}, null, false));
    }catch (error) {
      showNotification("Qualcosa è andato storto...", "warning");
    }
    finally {
      yield put(sendingRequest(false));
    }
  }
}

export function* updateFavoriteOnLoggedIn(action){

  const { payload } = action;

  let favoriteSports = yield call(AsyncStorage.getItem, FAVORITE_SPORTS);
  let favoriteCompetitors = yield call(AsyncStorage.getItem, FAVORITE_COMPETITORS);
  const favoriteAlreadySetted = yield call(AsyncStorage.getItem, ALREADY_SET_FAVORITE);

  //caso in cui l'utente è gia' acceduto e ha fatto la scelta dei preferiti
  if(favoriteAlreadySetted && favoriteSports && favoriteCompetitors && payload.data && payload.data.favorite_sports.length === 0){

    favoriteSports = JSON.parse(favoriteSports);
    favoriteCompetitors = JSON.parse(favoriteCompetitors);

    yield put(sendingRequest(true));
    try{
      yield put(updateProfile({userId: payload.data._id, favorite_sports: favoriteSports, favorite_competitors: favoriteCompetitors}, null, false));
    }catch (error) {
      showNotification("Qualcosa è andato storto...", "warning");
    }
    finally {
      yield put(sendingRequest(false));
    }
  }
}


export default function* root() {
  yield all([
    takeEvery(SET_FAVORITES, handleSetFavorites),
    takeEvery(PROFILE_GET_INFO_SUCCESS, updateFavoriteOnLoggedIn),
    //takeEvery([USER_LOGIN_SUCCESS, OAUTH_LOGIN_SUCCESS], updateFavorite)
  ]);

}