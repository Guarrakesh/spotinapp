import ProfileScreen from '../screens/ProfileScreen'
import { createStackNavigator } from 'react-navigation';

export default ProfileStack = createStackNavigator(
    {
        'Profile': ProfileScreen
    },
    {
        cardStyle: {backgroundColor: '#FAFAFA'}
    });


