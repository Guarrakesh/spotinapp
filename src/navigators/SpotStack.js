import SportScreen from "../screens/SportScreen";
import EventScreen from '../screens/EventScreen';
import BusinessListScreen from '../screens/BusinessListScreen';
import CompetitionsScreen from "../screens/CompetitionsScreen";
import {createStackNavigator} from "react-navigation";
import themes from "../styleTheme";
import BusinessScreen from "../components/BusinessScreen";
import BusinessMapScreen from "../screens/BusinessMapScreen";


import { View, Text } from 'react-native';


export const BusinessMapNavigator = createStackNavigator({
    BusinessMapScreen: {
        screen: BusinessMapScreen,
        navigationOptions: {
            title: "Locali nelle vicinanze",

        },
    }
    }, {
        mode: 'modal',

    }
);
export const SpotStack = createStackNavigator({
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
            navigationOptions: ({navigation}) => ({
                title: navigation.state.params.competition.name,
                headerBackTitle: null,
            })
        },
        BusinessList: {
            screen: BusinessListScreen,


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


