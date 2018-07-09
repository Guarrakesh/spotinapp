import {combineReducers} from 'redux';


import authReducer from './authReducer';
import navReducer from './navReducer';
import entityReducer from './entityReducer';
const rootReducer = combineReducers({
    nav: navReducer,
    auth: authReducer,
    entities: entityReducer
});

export default rootReducer;
