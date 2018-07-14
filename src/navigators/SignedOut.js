


import React from 'react';
import { FluidNavigator } from 'react-navigation-fluid-transitions';

import { Icon } from 'react-native-vector-icons/MaterialIcons'
import { createStackNavigator }  from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import SignupScreen from '../screens/SignupScreen';
import { TouchableHighlight } from 'react-native';
import themes from '../styleTheme';

const BackButton = ({onPress}) => (
    <TouchableHighlight onPress={onPress}>
        <Icon name="keyboard-backspace"/>
    </TouchableHighlight>
)

const SignedOut = createStackNavigator(
    {
        SignIn: {
            screen: LoginScreen,
            navigationOptions: {
                header: null
            }
        },
        SignUp: {
            screen: SignupScreen,
            navigationOptions: ({navigation}) => ({
                title: 'Sign Up',

            })
        }
    },
    {
        mode: 'modal',
        headerMode: 'screen',
        navigationOptions: {

            headerStyle: {
                backgroundColor: themes.base.colors.primary.default,
                borderBottomWidth: 0
            },
            headerTintColor: themes.base.colors.white.default,

        }

    }

);

export default SignedOut;