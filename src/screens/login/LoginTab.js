import React from 'react';
import {withNamespaces} from "react-i18next";
import { TabView, SceneMap } from 'react-native-tab-view';
import { Keyboard, Text, Dimensions } from 'react-native';
import SignInForm from "./SignInForm";



const LoginTab = ({ t }) => {

  const [navState, setNavState] = React.useState({
    index: 0,
    routes: [
        { key: 'signin', title: t("auth.login.signIn") },
      { key: 'signup', title: t("auth.login.register")}
    ]
  });
  const _handleIndexChange = (index) => {
    Keyboard.dismiss();
    setNavState({ ...navState, index });
  };

  return (
      <TabView
          navigationState={navState}
          renderScene={SceneMap({
            signin: SignInForm,
            signup: () => <Text>Ciao</Text>
          })}
          onIndexChange={_handleIndexChange}
          initialLayout={{ width: Dimensions.get('window').width }}

      />
  )
}

export default withNamespaces()(LoginTab);