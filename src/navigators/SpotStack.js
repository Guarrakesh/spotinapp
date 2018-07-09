import SportContainer from '../containers/SportContainer';
import { createStackNavigator } from 'react-navigation';
import { connect } from 'react-redux';


const SpotStack = createStackNavigator({
    SportList: {
        screen: SportContainer,
        navigationOptions: {
            title: 'Sport'
        }
    }
    },{
    cardStyle: {backgroundColor: '#FAFAFA'}

    }
);

export default SpotStack;


