import SportScreen from "../screens/SportScreen";
import EventScreen from '../screens/EventScreen';
import CompetitionsScreen from "../screens/CompetitionsScreen";
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";

const SpotStack = createStackNavigator({
        SportList: {
            screen: SportScreen,
            navigationOptions: {  title: 'Sport' }

        },
        Competitions: {
            screen: CompetitionsScreen,
            navigationOptions: ({navigation}) => ({ title: navigation.state.params.sport.name })
        },
        Events: {
            screen: EventScreen,
            navigationOptions: ({navigation}) => ({ title: navigation.state.params.competition.name})
        }
    },{
        navigationOptions: {

            headerStyle: {
                backgroundColor: themes.base.colors.primary.default
            },
            headerTintColor: themes.base.colors.white.default,
        }
    }
);

export default SpotStack;


