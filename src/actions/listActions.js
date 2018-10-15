export const CRUD_CHANGE_LIST_PARAMS = 'CRUD_CHANGE_LIST_PARAMS';
export const SET_LIST_SELECTED_IDS = 'SET_LIST_SELECTED_IDS';
export const TOGGLE_LIST_ITEM = 'TOGGLE_LIST_ITEM';
export const INIT_LIST = 'INIT_LIST';

export const initList = (resource, id) => ({
  type: INIT_LIST,
  meta: { resource }, 
  id
});
export const changeListParams = (resource, listId, params) => ({
  type: CRUD_CHANGE_LIST_PARAMS,
  payload: params,
  meta: { resource, listId },
});

export const setListSelectedIds = (resource, listId, ids) => ({
  type: SET_LIST_SELECTED_IDS,
  payload: ids,
  meta: { resource, listId },
});

export const toggleListItem = (resource, listId,  id) => ({
  type: TOGGLE_LIST_ITEM,
  payload: id,
  meta: { resource, listId },
});
