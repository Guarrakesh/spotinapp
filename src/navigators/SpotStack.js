import SportScreen from "../screens/SportScreen";
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


