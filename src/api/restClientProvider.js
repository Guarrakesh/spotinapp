/* eslint-disable */


import { stringify } from 'query-string';
import {


  GET_LIST,
  GET_ONE,
  GET_MANY,
  GET_MANY_REFERENCE,
  CREATE,
  UPDATE,
  UPDATE_MANY,
  DELETE,
  DELETE_MANY,
} from '../actions/types';
import {fetchJson, flattenObject} from '../helpers/fetch';

const convertOrder = order => {
  return order === "ASC" ? 1 : -1;
}
/**
 * Maps react-admin queries to a json-server powered REST API
 *
 * @see https://github.com/typicode/json-server
 * @example
 * GET_LIST     => GET http://my.api.url/posts?_sort=title&_order=ASC&_start=0&_end=24
 * GET_ONE      => GET http://my.api.url/posts/123
 * GET_MANY     => GET http://my.api.url/posts/123, GET http://my.api.url/posts/456, GET http://my.api.url/posts/789
 * UPDATE       => PUT http://my.api.url/posts/123
 * CREATE       => POST http://my.api.url/posts/123
 * DELETE       => DELETE http://my.api.url/posts/123
 */
export default (apiUrl, httpClient = fetchJson) => {
  /**
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} { url, options } The HTTP request parameters
   */
  const convertDataRequestToHTTP = (type, resource, params) => {
    let url = '';
    const options = {};
    switch (type) {
      case GET_LIST: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        let query = {
          ...flattenObject(params.filter),
          _sort: field,
          _order: convertOrder(order),
          _start: (page - 1) * perPage,
          _end: page * perPage,
        };
        if (params.position) {
          const {latitude, longitude, radius} = params.position;
          if (latitude && longitude)
            query = {...query, latitude, longitude, radius};
        }
        url = `${apiUrl}/${resource}?${stringify(query)}`;

        break;
      }
      case GET_ONE:
        url = `${apiUrl}/${resource}/${params.id}`;
        break;
      case GET_MANY_REFERENCE: {
        const { page, perPage } = params.pagination;
        const { field, order } = params.sort;
        const query = {
          ...flattenObject(params.filter),
          [params.target]: params.id,
          _sort: field,
          _order: convertOrder(order),
          _start: (page - 1) * perPage,
          _end: page * perPage,
        };
        url = `${apiUrl}/${resource}?${stringify(query)}`;
        break;
      }
      case UPDATE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'PATCH';
        if (params.data instanceof(FormData)) {
          options.body = params.data;
        //  options.headers = new Headers({'Content-Type': false});
          break;
        }

        options.body = JSON.stringify(params.data);
        break;
      case CREATE:
        url = `${apiUrl}/${resource}`;
        options.method = 'POST';
        if (params.data instanceof(FormData)) {
          options.body = params.data;
          break;
        }
        options.body = JSON.stringify(params.data);
        break;
      case DELETE:
        url = `${apiUrl}/${resource}/${params.id}`;
        options.method = 'DELETE';
        break;
      case GET_MANY: {
        const query = {
          [`id_like`]: params.ids.join('|'),
        };
        url = `${apiUrl}/${resource}?id_like=${query.id_like}`;
        break;
      }
      default:
        throw new Error(`Unsupported fetch action type ${type}`);
    }
    return { url, options };
  };

  /**
   * @param {Object} response HTTP response from fetch()
   * @param {String} type One of the constants appearing at the top if this file, e.g. 'UPDATE'
   * @param {String} resource Name of the resource to fetch, e.g. 'posts'
   * @param {Object} params The data request params, depending on the type
   * @returns {Object} Data response
   */
  const convertHTTPResponse = (response, type, resource, params) => {
    const { headers, json } = response;
    switch (type) {
      case GET_LIST:
      case GET_MANY:
      case GET_MANY_REFERENCE: {
        let data = [], total, near = {};
        if (!json.docs) {
          data = json.map(res => ({...res, id: res._id}));
          if (!headers.has('x-total-count')) {
            throw new Error(
              'The X-Total-Count headers is missing. '
            );
          }
          total = parseInt(
            headers
              .get('x-total-count')
              .split('/')
              .pop(),
            10
          );


        } else {
          if (params.position && params.position.latitude) {
            //Gestisco il caso in cui la risposta contiene dati geolocalizzati
            //I dati le inserisco in data (cosicché il data reducer li inserisca in entities)
            //mentre le informazioni { id, distance } le inserisci il near (cosicché il near reducer li salvi)
            data = json.docs.map(res => ({
                ...res, id: res._id
            }));
            near = json.near;
          } else {
            data = json.docs.map(res => ({...res, id: res._id}));
          }
          total = parseInt(json.total);
        }

        const response = {
          data, total
        };
        if (near) response['near'] = near;
        return response;
      }
      case UPDATE:
      case GET_ONE:
        return { data: {...json, id: json._id }  };
      case CREATE:
        return { data: { ...params.data, id: json._id } };
      case DELETE:
        return { data: { id : null}};
      default:
        return { data: json };
    }
  };

  /**
   * @param {string} type Request type, e.g GET_LIST
   * @param {string} resource Resource name, e.g. "posts"
   * @param {Object} payload Request parameters. Depends on the request type
   * @returns {Promise} the Promise for a data response
   */
  return (type, resource, params) => {

    const { url, options } = convertDataRequestToHTTP(
      type,
      resource,
      params
    );
    return httpClient(url, options).then(response =>
      convertHTTPResponse(response, type, resource, params)
    );
  };
};
