import {
  START_OPTIMISTIC_MODE,
  STOP_OPTIMISTIC_MODE
} from '../actions/uiActions';

const initialState = {
  optimistic: false
};

export default (previousState = initialState, {type, payload}) => {
  switch (type) {

    case START_OPTIMISTIC_MODE:
      return { ...previousState, optimistic: true};

    case STOP_OPTIMISTIC_MODE:
      return { ...previousState, optimistic: false};
  }
}