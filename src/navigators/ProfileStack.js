import ProfileScreen from '../screens/profile/ProfileScreen'
import { createStackNavigator } from 'react-navigation';
import themes from "../styleTheme";
import AuthNavigator from './AuthNavigator';
import ReservationScreen from "../screens/profile/ReservationScreen";

export const ProfileStack = createStackNavigator({
    ProfileScreen: {
      screen: ProfileScreen,
      navigationOptions: { title: 'Profilo'}
    },
    ReservationScreen: {
      screen: ReservationScreen,
      navigationOptions: {
        title: 'Offerta prenotata'
      }
    }

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