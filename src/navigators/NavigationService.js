
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

  const routes = routeName.split(".");
  const actions = routes.map(route => {
    if (routes.indexOf(route) === (routes.length - 1)) {
      // Se è l'ultima route del path,p asso i params
      return NavigationActions.navigate({routeName: route, params});
    } else {
      return NavigationActions.navigate({routeName: route, params: {}});
    }
  });
  if (setRoot) {
    return StackActions.reset({
      index: 0,
      key: null, // @see https://github.com/react-navigation/react-navigation/issues/1127
      actions: actions
    });

  } else {


    return NavigationActions.navigate({
      routeName: routes.length === 1 ? routeName : routes[0],
      params
    })

  }
}

export default {
  back,
  navigate,
  setTopLevelNavigator
};