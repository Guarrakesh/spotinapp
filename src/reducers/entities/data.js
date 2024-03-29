import { FETCH_END } from '../../actions/fetchActions';
import {
  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
} from '../../actions/types';
import {
  CRUD_DELETE_OPTIMISTIC,
  CRUD_DELETE,
  CRUD_DELETE_MANY_OPTIMISTIC,
  CRUD_UPDATE_OPTIMISTIC,
  CRUD_UPDATE_MANY_OPTIMISTIC,
} from '../../actions/dataActions';

import getFetchedAt from '../../helpers/getFetchedAt';

/**
 * Add new records to the pool, and remove outdated ones.
 *
 * This is the equivalent of a stale-while-revalidate caching strategy:
 * The cached data is displayed before fetching, and stale data is removed
 * only once fresh data is fetched.
 */
export const addRecordsFactory = getFetchedAt => (
    newRecords = [],
    oldRecords
) => {
  const newFetchedAt = getFetchedAt(
      newRecords.map(({ id }) => id),
      oldRecords.fetchedAt
  );

  const newRecordsById = newRecords.reduce(
      (acc, record) => ({
        ...acc,
        [record.id]: record,
      }),
      {}
  );

  const records = Object.keys(newFetchedAt).reduce(
      (acc, id) => ({
        ...acc,
        [id]: newRecordsById[id] || oldRecords[id],
      }),
      {}
  );

  Object.defineProperty(records, 'fetchedAt', {
    value: newFetchedAt,
  }); // non enumerable by default

  return records;
};

//const addRecords = addRecordsFactory(getFetchedAt);

//Disabilitato caching dei record per evitare problemi di stato corrotto durante la navigazione
const addRecords = (newRecords = [], oldRecords) => {
  const newRecordsById = newRecords.reduce(
      (acc, record) => ({
        ...acc,
        [record.id]: record
      })
      , {});
  const records = { ...oldRecords, ...newRecordsById };

  return records;
};

const addRecordsWithCache =  (newRecords = [], oldRecords) => {
  return addRecordsFactory(getFetchedAt)(newRecords, oldRecords);
};
const initialState = {};
Object.defineProperty(initialState, 'fetchedAt', { value: {} }); // non enumerable by default

export default (previousState = initialState, { type, payload, meta = {} }) => {
  /**
   * optimisticData è il l'object da inserire ottimisticamente prima della richiesta
   * Dato che verrà sovrascritto una volta avuta la risposta
   */
  const { optimisticData, fetchResponse } = meta;

  if (type === CRUD_UPDATE_OPTIMISTIC) {
    const updatedRecord = { ...previousState[payload.id], ...payload.data };
    return addRecordsWithCache([updatedRecord], previousState);
  }
  if (type === CRUD_UPDATE_MANY_OPTIMISTIC) {
    const updatedRecords = payload.ids
        .reduce((records, id) => records.concat(previousState[id]), [])
        .map(record => ({ ...record, ...payload.data }));
    return addRecordsWithCache(updatedRecords, previousState);
  }
  if (type === CRUD_DELETE_MANY_OPTIMISTIC) {
    const newState = Object.entries(previousState)
        .filter(([key]) => !payload.ids.includes(key))
        .reduce((obj, [key, val]) => ({ ...obj, [key]: val }), {});

    Object.defineProperty(newState, 'fetchedAt', {
      value: previousState.fetchedAt,
    });

    return newState;
  }
  if (meta && meta.optimisticData && meta.fetch && [CREATE, UPDATE].includes(meta.fetch)) {
    const record = { ...previousState[payload.id], ...meta.optimisticData };
    return addRecordsWithCache([record], previousState);
  }

  if (!meta || !meta.fetchResponse || meta.fetchStatus !== FETCH_END) {
    return previousState;
  }
  switch (meta.fetchResponse) {
    case GET_LIST:
    case GET_MANY:
    case GET_MANY_REFERENCE:
      return addRecordsWithCache(payload.data, previousState);
    case GET_ONE:
    case UPDATE:
    case CREATE:
      return addRecordsWithCache([payload.data], previousState);
    default:
      return previousState;
  }
};

export const getRecord = (state, id) => state[id];


//export const selectedCachedData
export const fetchedAtEqualityFn = (state, prevState) => {
  console.log()
};
