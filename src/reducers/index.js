import {combineReducers} from 'redux';




import authReducer from './auth';
import references from './references';
import entities from './entities';
import location from './location';
import loading from './loading';
import ui from './ui';
import notifications from './notifications';

const rootReducer = combineReducers({
    location,
    auth: authReducer,
    entities,
    loading,
    references,
    notifications,
    ui
});

export default rootReducer;
