import { REFRESH_LIST } from '../../../actions/listActions';

const defaultState = 0;


export default (previousState = defaultState, { type }) => {
  switch (type) {
    case REFRESH_LIST:
      return previousState + 1;
    default:
      return previousState;
  }
};
