import SportScreen from '../screens/SportScreen';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';


const SpotStack = createStackNavigator({
    SportList: {
        screen: SportScreen,
        navigationOptions: {
            title: 'Sport'
        }
    }
    },{
    cardStyle: {backgroundColor: '#FAFAFA'}

    }
);

export default SpotStack;


