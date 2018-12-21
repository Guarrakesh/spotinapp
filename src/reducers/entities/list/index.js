import { combineReducers } from 'redux';
import ids from './ids';
import params from './params';
import selectedIds from './selectedIds';
import total from './total';
import version from "./version";
import { INIT_LIST } from '../../../actions/listActions';

/**
* Reducer che si occupa di gestire le liste relative ad un entity
* Ogni lista è rappresentata da un listId, univoco per ogni lista, che è
* dato da ListController (o InlineListController)
* all'atto di inizializzazione di quella lista
**/

const initialState = {};
export default (previousState = initialState, action) => {

  if (action.type === INIT_LIST) {
    const listState = {
      isLoading: false,
      ids: ids(undefined, action),
      params: params(undefined, action),
      selectedIds: selectedIds(undefined, action),
      version: version(undefined, action),
      total: total(undefined, action)
    };

    const newState = {
      ...previousState,
      [action.payload.id]: listState
    };

    return newState;
  }
  const listIds = Object.keys(previousState);

  let noContent = false;
  if (action.type.includes("SUCCESS") && action.payload && action.payload.data && Object.keys(action.payload.data).length === 0) {
    noContent = true;
  }
  const newState = listIds.reduce(
    (acc, id) => ({
      ...acc,
      [id]:
        action.meta.listId == id
          ? {
            isLoading: action.type.includes('LOADING'),
            ids: ids(previousState[id].ids, action),
            params: params(previousState[id].params, action),
            selectedIds: selectedIds(previousState[id].selectedIds, action),
            total: total(previousState[id].total, action),
            version: version(previousState[id].version, action),
            noContent,
          }
          : previousState[id]
    }), {});

    return newState;

};
