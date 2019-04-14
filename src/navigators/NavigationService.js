
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

function createActionWithSubActions(routes, idx = 0, params = {}){
  return NavigationActions.navigate({
    routeName: routes[idx],
    action: routes[idx] ? createActionWithSubActions(routes, idx + 1, params) : undefined,
    params,
  })
}
function navigate(routeName, params, setRoot = false) {

  const routes = routeName.split(".");
  const actions = [
    createActionWithSubActions(routes, 0, params)
  ];
  /*const actions = routes.map(route => {
    if (routes.indexOf(route) === (routes.length - 1)) {
      // Se è l'ultima route del path,p asso i params
      return NavigationActions.navigate({routeName: route, params});
    } else {
      return NavigationActions.navigate({routeName: route, params: {}});
    }
  });*/
  if (setRoot) {
    return StackActions.reset({
      index: 0,
      key: null, // @see https://github.com/react-navigation/react-navigation/issues/1127
      actions: actions
    });
  } else {


    return createActionWithSubActions(routes, 0, params);

  }
}

export default {
  back,
  navigate,
  setTopLevelNavigator
};