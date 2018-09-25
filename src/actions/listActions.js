export const CRUD_CHANGE_LIST_PARAMS = 'CRUD_CHANGE_LIST_PARAMS';
export const SET_LIST_SELECTED_IDS = 'SET_LIST_SELECTED_IDS';
export const TOGGLE_LIST_ITEM = 'TOGGLE_LIST_ITEM';

export const changeListParams = (resource, params) => ({
  type: CRUD_CHANGE_LIST_PARAMS,
  payload: params,
  meta: { resource },
});

export const setListSelectedIds = (resource, ids) => ({
  type: SET_LIST_SELECTED_IDS,
  payload: ids,
  meta: { resource },
});

export const toggleListItem = (resource, id) => ({
  type: TOGGLE_LIST_ITEM,
  payload: id,
  meta: { resource },
});
