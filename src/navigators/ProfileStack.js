import Profile from '../components/ProfileComponents/Profile';
import { createStackNavigator } from 'react-navigation';

export default ProfileStack = createStackNavigator(
    {
    'Profile': Profile
    },
    {
        cardStyle: {backgroundColor: '#000000'}
    });


