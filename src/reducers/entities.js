import {REGISTER_RESOURCE, UNREGISTER_RESOURCE} from '../actions/entities';

import data from './entities/data';
import list from './entities/list';


const initialState = {};

export default (previousState = initialState, action) => {

  if (action.type === REGISTER_RESOURCE) {

    const resourceState = {
      props: action.payload,
      data: data(undefined, action),
      list: list(undefined, action)
    };

    const newState = {
        ...previousState,
        [action.payload.name]: resourceState
    };

    return newState;
  }

  if (action.type === UNREGISTER_RESOURCE) {

    const newState = Object.keys(previousState).reduce((acc, key) => {
      if (key === action.payload) {
        return acc;
      }
      return { ...acc, [key]: previousState[key]};
    }, {});
    return newState;
  }

  if (!action.meta || !action.meta.resource) {
    return previousState;
  }

  const resources = Object.keys(previousState);
  const newState = resources.reduce(
      (acc, resource) => ({
          ...acc,
          [resource]:
              action.meta.resource === resource
                ? {
                      props: previousState[resource].props,
                      data: data(previousState[resource].data, action),
                      list: list(previousState[resource].list, action)
                  }
                : previousState[resource]
      }),
      {}
  );
  return newState;
};