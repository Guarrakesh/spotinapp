import {combineReducers} from 'redux';




import authReducer from './authReducer';
import references from './references';
import entities from './entities';
import location from './location';
import loading from './loading';
import ui from './ui';


const rootReducer = combineReducers({
    location,
    auth: authReducer,
    entities,
    loading,
    references,
    ui
});

export default rootReducer;
