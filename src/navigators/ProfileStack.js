import ProfileScreen from '../screens/profile/ProfileScreen'
import { createStackNavigator } from 'react-navigation';
import themes from "../styleTheme";

export const ProfileStack = createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: { title: 'Profilo'}
    },


  },{
    navigationOptions: {

      headerStyle: {
        backgroundColor: themes.base.colors.primary.default

      },
      headerTintColor: themes.base.colors.text.default,
    }
  }
);


export default ProfileStack;