import {
  GET_LIST,
  GET_ONE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  GET_MANY,
  GET_MANY_REFERENCE
} from './types';


export const CRUD_GET_LIST = 'CRUD_GET_LIST';
export const CRUD_GET_LIST_LOADING = 'CRUD_GET_LIST_LOADING';
export const CRUD_GET_LIST_FAILURE = 'CRUD_GET_LIST_FAILURE';
export const CRUD_GET_LIST_SUCCESS = 'CRUD_GET_LIST_SUCCESS';

export const crudGetList = (resource, listId, pagination,
                            sort, filter, basePath,
                            accumulateResults = false,
                            refreshing = false,
                            ) => ({
  type: CRUD_GET_LIST,
  payload: { pagination, sort, filter },
  meta: {
    //selectedId
    resource,
    basePath,
    listId,
    refreshing,
    fetch: GET_LIST,
    accumulateResults,
    /*onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning'
      }
    }*/
  }
});

export const CRUD_GET_ALL = 'CRUD_GET_ALL';
export const CRUD_GET_ALL_LOADING = 'CRUD_GET_ALL_LOADING';
export const CRUD_GET_ALL_FAILURE = 'CRUD_GET_ALL_FAILURE';
export const CRUD_GET_ALL_SUCCESS = 'CRUD_GET_ALL_SUCCESS';

export const crudGetAll = (resource, sort, filter, maxResults, callback, basePath) => ({
  type: CRUD_GET_ALL,
  payload: { sort, filter, pagination: { page: 1, perPage: maxResults } },
  meta: {
    resource,
    basePath,
    fetch: GET_LIST,
    onSuccess: {
      callback,
    },
    onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },
  },
});

export const CRUD_GET_ONE = 'CRUD_GET_ONE';
export const CRUD_GET_ONE_LOADING = 'CRUD_GET_ONE_LOADING';
export const CRUD_GET_ONE_FAILURE = 'CRUD_GET_ONE_FAILURE';
export const CRUD_GET_ONE_SUCCESS = 'CRUD_GET_ONE_SUCCESS';

export const crudGetOne = (resource, id, basePath, refresh = true, listId) => ({
  type: CRUD_GET_ONE,
  payload: { id },
  meta: {
    resource,
    listId,
    fetch: GET_ONE,
    basePath,
    /*onFailure: {
      notification: {
        body: 'spotinapp.notification.item_doesnt_exist',
        level: 'warning',
      },
      redirectTo: 'list',
      refresh,
    },*/
  },
});

export const CRUD_CREATE = 'CRUD_CREATE';
export const CRUD_CREATE_LOADING = 'CRUD_CREATE_LOADING';
export const CRUD_CREATE_FAILURE = 'CRUD_CREATE_FAILURE';
export const CRUD_CREATE_SUCCESS = 'CRUD_CREATE_SUCCESS';

export const crudCreate = (resource, data, basePath, redirectTo = 'edit', listId) => ({
  type: CRUD_CREATE,
  payload: { data },
  meta: {
    basePath,
    resource,
    fetch: CREATE,
    listId,
   /* onSuccess: {
      notification: {
        body: 'spotinapp.notification.created',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
      redirectTo,
      basePath,
    },
    onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_UPDATE = 'CRUD_UPDATE';
export const CRUD_UPDATE_LOADING = 'CRUD_UPDATE_LOADING';
export const CRUD_UPDATE_FAILURE = 'CRUD_UPDATE_FAILURE';
export const CRUD_UPDATE_SUCCESS = 'CRUD_UPDATE_SUCCESS';
export const CRUD_UPDATE_OPTIMISTIC = 'CRUD_UPDATE_OPTIMISTIC';

export const crudUpdate = (
    resource,
    listId,
    id,
    data,
    previousData,
    basePath,
    redirectTo = 'show'
) => ({
  type: CRUD_UPDATE,
  payload: { id, data, previousData },
  meta: {
    resource,
    listId,
    fetch: UPDATE,
    basePath,
  /*  onSuccess: {
      notification: {
        body: 'spotinapp.notification.updated',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
      redirectTo,
      basePath,
    },
    onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_UPDATE_MANY = 'RA/CRUD_UPDATE_MANY';
export const CRUD_UPDATE_MANY_LOADING = 'RA/CRUD_UPDATE_MANY_LOADING';
export const CRUD_UPDATE_MANY_FAILURE = 'RA/CRUD_UPDATE_MANY_FAILURE';
export const CRUD_UPDATE_MANY_SUCCESS = 'RA/CRUD_UPDATE_MANY_SUCCESS';
export const CRUD_UPDATE_MANY_OPTIMISTIC = 'RA/CRUD_UPDATE_MANY_OPTIMISTIC';

export const crudUpdateMany = (
    resource,
    ids,
    data,
    basePath,
    refresh = true
) => ({
  type: CRUD_UPDATE_MANY,
  payload: { ids, data },
  meta: {
    resource,
    fetch: UPDATE_MANY,
    cancelPrevious: false,
    basePath,
   /* onSuccess: {
      notification: {
        body: 'ra.notification.updated',
        level: 'info',
        messageArgs: {
          smart_count: ids.length,
        },
      },
      basePath,
      refresh,
      unselectAll: true,
    },
    onFailure: {
      notification: {
        body: 'ra.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});
export const CRUD_DELETE = 'CRUD_DELETE';
export const CRUD_DELETE_LOADING = 'CRUD_DELETE_LOADING';
export const CRUD_DELETE_FAILURE = 'CRUD_DELETE_FAILURE';
export const CRUD_DELETE_SUCCESS = 'CRUD_DELETE_SUCCESS';
export const CRUD_DELETE_OPTIMISTIC = 'CRUD_DELETE_OPTIMISTIC';

export const crudDelete = (
    resource,
    id,
    previousData,
    basePath,
    listId,
) => ({
  type: CRUD_DELETE,
  payload: { id, previousData },
  meta: {
    basePath,
    resource,
    listId,
    fetch: DELETE,
    /*onSuccess: {
      notification: {
        body: 'spotinapp.notification.deleted',
        level: 'info',
        messageArgs: {
          smart_count: 1,
        },
      },
      redirectTo,
      basePath,
    },
    onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});


export const CRUD_DELETE_MANY = 'CRUD_DELETE_MANY';
export const CRUD_DELETE_MANY_LOADING = 'CRUD_DELETE_MANY_LOADING';
export const CRUD_DELETE_MANY_FAILURE = 'CRUD_DELETE_MANY_FAILURE';
export const CRUD_DELETE_MANY_SUCCESS = 'CRUD_DELETE_MANY_SUCCESS';
export const CRUD_DELETE_MANY_OPTIMISTIC = 'CRUD_DELETE_MANY_OPTIMISTIC';

export const crudDeleteMany = (resource, ids, basePath, refresh = true) => ({
  type: CRUD_DELETE_MANY,
  payload: { ids },
  meta: {
    resource,
    fetch: DELETE_MANY,
    basePath,
   /* onSuccess: {
      notification: {
        body: 'spotinapp.notification.deleted',
        level: 'info',
        messageArgs: {
          smart_count: ids.length,
        },
      },
      basePath,
      refresh,
      unselectAll: true,
    },
    onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_GET_MANY = 'CRUD_GET_MANY';
export const CRUD_GET_MANY_LOADING = 'CRUD_GET_MANY_LOADING';
export const CRUD_GET_MANY_FAILURE = 'CRUD_GET_MANY_FAILURE';
export const CRUD_GET_MANY_SUCCESS = 'CRUD_GET_MANY_SUCCESS';

// Reference related actions

export const crudGetMany = (resource, ids, listId, basePath,  accumulateResults = false) => ({
  type: CRUD_GET_MANY,
  payload: { ids },
  meta: {
    resource,
    listId,
    basePath,
    fetch: GET_MANY,
    accumulateResults
  /*  onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_GET_MATCHING = 'CRUD_GET_MATCHING';
export const CRUD_GET_MATCHING_LOADING = 'CRUD_GET_MATCHING_LOADING';
export const CRUD_GET_MATCHING_FAILURE = 'CRUD_GET_MATCHING_FAILURE';
export const CRUD_GET_MATCHING_SUCCESS = 'CRUD_GET_MATCHING_SUCCESS';

export const crudGetMatching = (
    reference,
    relatedTo,
    pagination,
    sort,
    filter
) => ({
  type: CRUD_GET_MATCHING,
  payload: { pagination, sort, filter },
  meta: {
    resource: reference,
    relatedTo,
    fetch: GET_LIST,
    /*onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_GET_MANY_REFERENCE = 'CRUD_GET_MANY_REFERENCE';
export const CRUD_GET_MANY_REFERENCE_LOADING =
    'CRUD_GET_MANY_REFERENCE_LOADING';
export const CRUD_GET_MANY_REFERENCE_FAILURE =
    'CRUD_GET_MANY_REFERENCE_FAILURE';
export const CRUD_GET_MANY_REFERENCE_SUCCESS =
    'CRUD_GET_MANY_REFERENCE_SUCCESS';

export const crudGetManyReference = (
    reference,
    target,
    id,
    relatedTo,
    pagination,
    sort,
    filter,
    source,
    basePath,
) => ({
  type: CRUD_GET_MANY_REFERENCE,
  payload: { target, id,  pagination, sort, filter, source },
  meta: {
    resource: reference,
    relatedTo,
    basePath,
    fetch: GET_MANY_REFERENCE,
   /* onFailure: {
      notification: {
        body: 'spotinapp.notification.http_error',
        level: 'warning',
      },
    },*/
  },
});

export const CRUD_GET_NEAR_MANY = 'CRUD_GET_NEAR_MANY';
export const CRUD_GET_NEAR_MANY_LOADING = 'CRUD_GET_NEAR_MANY_LOADING';
export const CRUD_GET_NEAR_MANY_FAILURE = 'CRUD_GET_NEAR_MANY_FAILURE';
export const CRUD_GET_NEAR_MANY_SUCCESS = 'CRUD_GET_NEAR_MANY_SUCCESS';

// Get near (by location) entities
export const crudGetNearMany = (
    resource, listId, position, pagination, sort, filter, basePath,  accumulateResults = false,
) => ({
  resource,

  type: CRUD_GET_NEAR_MANY,
  payload: { position, pagination, sort, filter },
  meta: {
    basePath,
    resource,
    listId,
    fetch: GET_LIST,
    accumulateResults
    /*onSuccess:
     onFailure: {
     notification: {
     body: 'spotinapp.notification.http_error',
     level: 'warning'
     }
     }*/
  }
})
