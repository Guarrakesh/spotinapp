
/**
 *  @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
 *
 */

import { NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}
function back() {
  return NavigationActions.back();
}
function navigate(routeName, params, setRoot = false) {


  if (setRoot) {
    return action = StackActions.reset({
      index: 0,
      key: null, // @see https://github.com/react-navigation/react-navigation/issues/1127
      actions: [NavigationActions.navigate({routeName, params})]
    });

  } else {


    return NavigationActions.navigate({
      routeName,
      params
    })

  }
}

export default {
  back,
  navigate,
  setTopLevelNavigator
};