import {combineReducers} from 'redux';




import authReducer from './authReducer';

import entityReducer from './entityReducer';
import locationReducer from './locationReducer';


const rootReducer = combineReducers({
    location: locationReducer,
    auth: authReducer,
    entities: entityReducer,
});

export default rootReducer;
