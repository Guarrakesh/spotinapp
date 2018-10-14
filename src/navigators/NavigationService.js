
/**
 *  @see https://reactnavigation.org/docs/en/navigating-without-navigation-prop.html
*
 */

import { NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
    _navigator = navigatorRef;
}

function navigate(routeName, params, setRoot = false) {
  if (setRoot) {
    const action = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({routeName, params})]
    });
    _navigator.dispatch(action);
  } else {


    _navigator.dispatch(
        NavigationActions.navigate({
            routeName,
            params
        })
    );
  }
}

export default {
    navigate,
    setTopLevelNavigator
};