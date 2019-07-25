import React, { useCallback, useEffect } from 'react';
import {withNamespaces} from "react-i18next";
import { TabView, SceneMap, TabBar} from 'react-native-tab-view';
import { Keyboard, Text, Dimensions } from 'react-native';
import SignInForm from "./SignInForm";
import themes from "../../styleTheme";


const CustomTabBar = React.memo((props) => (
  <TabBar

      indicatorStyle={{backgroundColor: themes.base.colors.accent.default}}
      style={{ backgroundColor: 'transparent', color: 'red'}}
      width={"100%"}
      labelStyle={{color: themes.base.colors.accent.default}}
      { ...props}
    />
));
const { width, height} = Dimensions.get('screen');

const LoginTab = ({ t, activeTab}) => {

  const [navState, setNavState] = React.useState({
    index: activeTab === "signin" ? 0 : 1,
    routes: [
      { key: 'signin', title: t("auth.login.signIn") },
      { key: 'signup', title: t("auth.login.register")}
    ]
  });

  const _handleIndexChange = (index) => {
    Keyboard.dismiss();
    setNavState({ ...navState, index });
  };
  const _renderScene = useCallback(SceneMap({
    signin: ()  => <SignInForm/>,
    signup: () => <Text>Ciao</Text>,
  }), []);
  return (
      <TabView

          useNativeDriver={true}
          navigationState={navState}
          renderScene={_renderScene}
          renderTabBar={(props) => <CustomTabBar {...props}/>}
          onIndexChange={_handleIndexChange}
          initialLayout={{ width, height: height - height/5}}

      />
  )
};

export default withNamespaces()(LoginTab);