import {

  REFRESH_VIEW,

} from '../actions/types';

const defaultState = {

  viewVersion: 0,
};

export default (previousState = defaultState, { type }) => {
  switch (type) {

    case REFRESH_VIEW:
      return {
        ...previousState,
        viewVersion: previousState.viewVersion + 1,
      };
    default:
      return previousState;
  }
};
