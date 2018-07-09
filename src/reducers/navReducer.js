import { combineReducers } from 'redux';
import { NavigationActions } from 'react-navigation';

import { RootNavigator } from '../navigators/AppNavigator';


// Start with two routes: The Main screen, with the Login screen on top.

const firstAction = {type: NavigationActions.navigate('SignedIn') }
const tempNavState = RootNavigator.router.getStateForAction(firstAction);



const initialNavState = RootNavigator.router.getStateForAction(
    firstAction,
    tempNavState
);



export default function navReducer(state = initialNavState, action) {
    let nextState;

    switch (action.type) {
        default:
            nextState = RootNavigator.router.getStateForAction(action,state);
    }
    return nextState || state;
}

