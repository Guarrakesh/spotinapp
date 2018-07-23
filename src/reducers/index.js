import {combineReducers} from 'redux';




import authReducer from './authReducer';

import entityReducer from './entityReducer';



const rootReducer = combineReducers({

    auth: authReducer,
    entities: entityReducer,
});

export default rootReducer;
