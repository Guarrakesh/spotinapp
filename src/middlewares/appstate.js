  import { AppState, Platform } from 'react-native';
  import CodePush from 'react-native-code-push';
  import { FOREGROUND, BACKGROUND, INACTIVE } from '../actions/appstate';

  export default () => (createStore) => (...args) => {
    const store = createStore(...args);

    let currentState = "";

    const handleAppStateChange = (nextAppState) => {

      if(Platform.OS === "android" && currentState === "inactive" && nextAppState === "active"){

        CodePush.restartApp();
      }

      if (currentState !== nextAppState) {
        let type;
        if (nextAppState === 'active') {
          type = FOREGROUND;
        } else if (nextAppState === 'background') {
          type = BACKGROUND;
        } else if (nextAppState === 'inactive') {
          type = INACTIVE;
        }
        if (type) {
          store.dispatch({
            type,
          });
        }
      }

      currentState = nextAppState;

    }
    AppState.addEventListener('change', handleAppStateChange);

    // setTimeout to allow redux-saga to catch the initial state fired by redux-enhancer-react-native-appstate library
    setTimeout(() => handleAppStateChange(AppState.currentState));
    return store;

  }


